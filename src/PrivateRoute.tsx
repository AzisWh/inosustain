import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  requiredRole: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  requiredRole,
  ...rest
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role_type !== requiredRole) {
      //   navigate('/access-denied');
      console.log('Access denied');
    }
  }, [user, requiredRole, navigate]);

  if (!user || user.role_type !== requiredRole) {
    return null;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
