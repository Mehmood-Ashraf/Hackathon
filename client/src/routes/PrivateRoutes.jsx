import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  console.log("User in private routes", user)
  if(loading) return <div>Loading.....</div>

  return user ? children : <Navigate to="/signup" />;
};

export default PrivateRoutes;
