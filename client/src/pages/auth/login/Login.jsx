import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext) 
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://hackathon-sage-zeta.vercel.app/api/auth/login", formData, { withCredentials : true })
      if(res?.data?.status){
        toast.success("Logged In Successfully")
        setUser(res?.data?.data)
        navigate('/')
      }else{
        toast.error(res?.data?.message || "Login Failed")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong!")
    }
  }

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
        <form onSubmit={loginHandler} className="bg-white rounded px-8 py-4 mb-4 flex flex-col justify-center ">
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;