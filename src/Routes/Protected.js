import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children, requiredRole }) {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  if (token && (!requiredRole || userRole === requiredRole)) {
    return children;
  } 
  return <Navigate to="/login" />;
}

export default Protected;
