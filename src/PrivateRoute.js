import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateRoute = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Завантаження...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;