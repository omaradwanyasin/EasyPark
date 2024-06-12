import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children, requiredRole }) {
  const token = sessionStorage.getItem("authToken");
  const userRole = sessionStorage.getItem("userRole");

  if (token && (!requiredRole || userRole === requiredRole)) {
    return children;
  } 
  return <Navigate to="/login" />;
}

export default Protected;
