import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useHr from "../../CustomHooks/useHr";
import { Navigate, useLocation } from "react-router-dom";

const HrRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isHR, isHRLoading] = useHr();
  const location = useLocation();

  if (loading || isHRLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-secondary"></span>
    );
  }

  if (user && isHR) {
    return children;
  }
  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default HrRoute;
