import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import toast from 'react-hot-toast';
import { RoleType } from './type/auth';
import { fetchCurrentUser } from './redux/auth/authSlice';

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
    if (token && !user) {
      dispatch(fetchCurrentUser() as any);
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (!token || !user || user.role_type !== requiredRole) {
      toast.error('Silakan login dengan akun yang sesuai.');
      navigate('/login', { replace: true });
    }
  }, [token, user, navigate, requiredRole]);

  if (!token || !user || user.role_type !== requiredRole) return null;

  return <Component />;
};

export default PrivateRoute;
