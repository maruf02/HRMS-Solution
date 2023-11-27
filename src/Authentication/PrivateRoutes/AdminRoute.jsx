import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../../CustomHooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-secondary"></span>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default AdminRoute;
