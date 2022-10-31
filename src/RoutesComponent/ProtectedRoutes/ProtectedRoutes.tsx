import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  //get item from localstorage
  const _token = localStorage.getItem("token");
  if (_token) {
    return {
      auth: true,
    };
  } else {
    return {
      auth: false,
    };
  }
};

const ProtectedRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
