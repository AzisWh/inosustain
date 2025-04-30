import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import toast from 'react-hot-toast';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  requiredRole: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  requiredRole,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role_type !== requiredRole) {
      toast.error(
        'Silakan login dengan akun terdaftar untuk mengakses halaman ini.'
      );
      navigate('/login');
    }
  }, [user, requiredRole, navigate]);

  if (!user || user.role_type !== requiredRole) {
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
