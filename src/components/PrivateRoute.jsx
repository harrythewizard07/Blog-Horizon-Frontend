import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth/auth";

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
