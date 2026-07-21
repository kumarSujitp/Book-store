// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("loggedInUser") === "true";

//   return isLoggedIn ? children : <Navigate to="/" replace />;
// };

// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { useFireBase } from "../../shared/context/FireBaseContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useFireBase();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/UserLogin" replace />;
};

export default PrivateRoute;