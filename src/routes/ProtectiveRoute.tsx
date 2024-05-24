// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { userSelector } from '../redux/users/selector';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser } = useSelector(userSelector);


  return currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
