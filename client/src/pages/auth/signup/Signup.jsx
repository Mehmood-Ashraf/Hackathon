import axios, { formToJSON } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import OtpModal from "../../../components/otpModal/OtpModal";
import { UserContext } from "../../../context/UserContext";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { validateForm } from "../../../utils/formValidation";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser, showOtpModal, setShowOtpModal } =
    useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    country: "",
    city: "",
  });
  const [imgFile, setImgFile] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  useEffect(() => {
    const shouldShowOtpModal = localStorage.getItem("otpModalStatus")
    if(shouldShowOtpModal === "true"){
      setShowOtpModal(true)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(imgFile);

    const validationErrors = validateForm(formData, "signup");
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return toast.error("Please fix the validation Errors");
    }

    try {
      const data = new FormData();

      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("country", formData.country);
      data.append("city", formData.city);

      if (imgFile) data.append("img", imgFile);

      const newUser = {
        ...formData,
        img: imgFile,
      };
      const res = await axios.post(
        `${localUrl}/api/auth/register`,
        data
      );
      if (res?.data?.status) {
        setUser(res.data.data);
        localStorage.setItem("id", res?.data?.data?._id)
        localStorage.setItem("email", res?.data?.data?.email)
        localStorage.setItem("otpModalStatus", "true")

        toast.success("User registered successfully, OTP sent to your Email");
        setShowOtpModal(true);
        // console.log(res.data.data);
        // console.log(user);
      }
    } catch (error) {
      // console.log(error?.response?.data?.message);
      // console.log("Signup Failed");
      toast.error(error?.response?.data?.message || "SignUp Failed!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-dvh">
        <div className="w-full max-w-[400px] shadow-md py-2">
          <div className="flex flex-col items-center gap-y-2">
            <h1 className="text-3xl font-semibold text-blue-600">Signup</h1>
            <p className="text-muted-foreground text-sm ">
              Create a new account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded px-8 py-4 mb-4 flex flex-col justify-center "
          >
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="userName"
                value={formData.userName}
              />
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="username"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.email}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.password}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center gap-3 mb-2 flex-col sm:flex-row">
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.country}
                  id="country"
                  type="text"
                  placeholder="Country"
                  name="country"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.city}
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImgFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            <div className="text-muted-foreground flex justify-center gap-1 text-sm mb-6">
              <p>Already have an account?</p>
              <Link to="/login">Log in</Link>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {showOtpModal ? <OtpModal /> : null}
    </>
  );
}
