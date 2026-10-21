import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/"}
        replace
      />
    );
  }

  return <Outlet />;
}