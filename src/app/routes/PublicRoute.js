// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("loggedInUser") === "true";

//   return isLoggedIn ? <Navigate to="/" replace /> : children;
// };

// export default PublicRoute;

import { Navigate } from "react-router-dom";
import { useFireBase } from "../../shared/context/FireBaseContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useFireBase();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;