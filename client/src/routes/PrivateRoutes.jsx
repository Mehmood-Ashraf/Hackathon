import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  // const { user, loading } = useContext(UserContext);
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  console.log("User in private routes", user)
  if(loading) return <Loader />

  return user ? children : <Navigate to="/signup" />;
};

export default PrivateRoutes;
