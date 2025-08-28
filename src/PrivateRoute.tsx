import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import toast from "react-hot-toast";
import { RoleType } from "./type/auth";
import { fetchCurrentUser, logout } from "./redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { authService } from "./api/authServices";

interface JwtPayload {
  exp: number;
  role_type?: number;
  [key: string]: any;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  requiredRole: RoleType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  requiredRole,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        toast.error("Silakan login terlebih dahulu.");
        dispatch(logout());
        navigate("/login", { replace: true });
        return;
      }

      if (isTokenExpired(token)) {
        console.log("Token kadaluarsa di PrivateRoute");
        try {
          await authService.logout();
          console.log("Logout berhasil");
        } catch (logoutError) {
          console.error("Gagal logout, melanjutkan logout lokal:", logoutError);
          toast.error("Sesi Anda telah kadaluarsa. Silakan login kembali.");
        }
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login", { replace: true });
        return;
      }

      if (token && !user) {
        try {
          await dispatch(fetchCurrentUser() as any).unwrap();
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
          toast.error("Sesi Anda tidak valid. Silakan login kembali.");
          localStorage.removeItem("token");
          dispatch(logout());
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [token, user, dispatch, navigate]);

  useEffect(() => {
    if (user && Number(user.role_type) !== requiredRole) {
      toast.error("Anda tidak memiliki akses ke halaman ini.");
      navigate("/", { replace: true });
    }
  }, [user, requiredRole, navigate]);

  if (
    !token ||
    isTokenExpired(token) ||
    !user ||
    (user && Number(user.role_type) !== requiredRole)
  ) {
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
