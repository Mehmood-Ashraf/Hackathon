import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import OtpModal from "../../../components/otpModal/OtpModal";
import { UserContext } from "../../../context/UserContext";

export default function Signup() {
  const { user, setUser, showOtpModal, setShowOtpModal } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    country: "",
    city: "",
  });
  const [imgFile, setImgFile] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imgFile);

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
        "http://localhost:5000/api/auth/register",
        data
      );
      if (res?.data?.status) {
        setUser(res.data.data);
        toast.success("User registered successfully, OTP sent to your Email");
        setShowOtpModal(true);
        console.log(res.data.data);
        console.log(user)
      }
    } catch (error) {
      console.error("Signup Failed", error.message);
      toast.error("SignUp Failed!" || res.message);
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
            </div>
            <div className="mb-2">
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
                type="password"
                placeholder="Password"
                required
                name="password"
              />
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
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="text-muted-foreground flex justify-center gap-1 text-sm mb-6">
              <p>Already have an account?</p>
              <a href="/login" className="text-primary font-medium hover:underline">
                Log in
              </a>
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
