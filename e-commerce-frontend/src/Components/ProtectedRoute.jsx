import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authenticated }) => {
  if (!authenticated) {
    // user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;