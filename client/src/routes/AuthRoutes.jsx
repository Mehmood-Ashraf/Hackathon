import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = ({ children }) => {
  // const { user } = useContext(UserContext);
  const user = useSelector((state) => state.auth.user)  
  
  if(user && user.isverified) {
    return <Navigate to="/" />
  } 
  return children
};

export default AuthRoutes;
