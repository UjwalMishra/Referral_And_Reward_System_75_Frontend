import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/jwt";
import type { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
