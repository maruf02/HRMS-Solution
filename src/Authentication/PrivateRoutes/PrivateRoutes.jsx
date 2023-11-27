import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-secondary"></span>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/signIn"></Navigate>;
};

export default PrivateRoutes;
