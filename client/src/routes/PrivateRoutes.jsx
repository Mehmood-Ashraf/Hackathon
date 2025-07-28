import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  console.log("User in private routes", user)
  if(loading) return <Loader />

  return user ? children : <Navigate to="/signup" />;
};

export default PrivateRoutes;
