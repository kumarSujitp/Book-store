import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedInUser") === "true";

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;