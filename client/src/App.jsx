import { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import { Route, Routes } from "react-router-dom";
import OtpModal from "./components/otpModal/OtpModal";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Layout from "./layout/Layout";
import { ThemeContext } from "./context/ThemeContext";

function App() {

  return (
    <>
    <div className="w-full">
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/otp" element={<OtpModal />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}

      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoutes>
              <Signup />
            </AuthRoutes>
          }
        />
        <Route
          path="/otp"
          element={
            <AuthRoutes>
              <OtpModal />
            </AuthRoutes>
          }
        />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          element={
            <PrivateRoutes>
              <Layout />
            </PrivateRoutes>
          }
        >
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
