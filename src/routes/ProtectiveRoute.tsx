// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("USER_ID");

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
