import { Church } from "@mui/icons-material";
import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    return children;
  } 
  return <Navigate to="/login" />;
}

export default Protected;