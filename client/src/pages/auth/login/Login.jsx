import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import OtpModal from "../../../components/otpModal/OtpModal";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/auth/authSlice";
import { openOtpModal } from "../../../features/otpModal/otpModalSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const otpModalOpen = useSelector((state) => state.modal.otpModalOpen)
  // const { setUser, user, showOtpModal, setShowOtpModal } =
  //   useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const shouldShowOtpModal = localStorage.getItem("otpModalStatus");
    if (shouldShowOtpModal === "true") {
      dispatch(openOtpModal())
    }
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${localUrl}/api/auth/login`, formData, {
        withCredentials: true,
      });
      if (res?.data?.status) {
        toast.success("Logged In Successfully");
        dispatch(setUser(res?.data?.data))
        // setUser(res?.data?.data);
        localStorage.setItem("token", res?.data?.data?.token)
        console.log(res.data.data.token);
        console.log(user)
        navigate("/");
      } else {
        // console.log(res?.data?.message);
        toast.error(res?.data?.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      const status = error?.response?.status;
      const errMsg = error?.response?.data;
      // console.log(status);
      // console.log(errMsg);
      if (status === 404 && errMsg.message === "User not found!") {
        toast.error("User not registered. Redirecting to signup.....");
        setTimeout(() => {
          navigate("/signup");
        }, 5000);
        return;
      } else if (status === 401 && errMsg.message === "Email not verified!") {
        toast.error(
          "Your account is not Verified. Please verify your email to login"
        );
        const email = error?.response?.data?.email;
        const id = error?.response?.data?.id;

        dispatch(setUser({ email, _id: id }));
        // console.log(user);
        localStorage.setItem("otpModalStatus", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("id", id);
        dispatch(openOtpModal())
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-full max-w-[400px] shadow-md py-2">
        <div className="flex flex-col items-center gap-y-2">
          {/* <div className="flex items-center gap-1 lg:justify-start">
          <a href="https://shadcnblocks.com">
            <img src={logo.src} alt="LOGO" className="h-12" />
          </a>
        </div> */}
          <h1 className="text-3xl font-semibold text-blue-600">Login</h1>
        </div>
        <form
          onSubmit={loginHandler}
          className="bg-white rounded px-8 py-4 mb-4 flex flex-col justify-center "
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              value={formData.email}
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <GoEye /> : <GoEyeClosed />}
            </span>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
      {otpModalOpen && <OtpModal />}
    </div>
  );
};

export default Login;
