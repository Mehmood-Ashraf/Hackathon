import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
  
  if(user && user.isverified) {
    return <Navigate to="/" />
  } 
  return children
};

export default AuthRoutes;
