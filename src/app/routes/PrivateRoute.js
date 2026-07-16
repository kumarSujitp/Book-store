import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedInUser") === "true";

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;