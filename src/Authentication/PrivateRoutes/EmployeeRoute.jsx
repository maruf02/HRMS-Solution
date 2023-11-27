import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useEmployee from "../../CustomHooks/useEmployee";
import { Navigate, useLocation } from "react-router-dom";

const EmployeeRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const location = useLocation();

  if (loading || isEmployeeLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-secondary"></span>
    );
  }

  if (user && isEmployee) {
    return children;
  }

  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default EmployeeRoute;
