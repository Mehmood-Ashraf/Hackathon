import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeOtpModal } from "../../features/otpModal/otpModalSlice";

export default function OtpModal() {
  // const { setShowOtpModal, user} = useContext(UserContext)
  const otpModalOpen = useSelector((state) => state.modal.otpModalOpen);
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const [otpNumber, setOtpNumber] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const handleVerify = async () => {
    // console.log(user)
    // console.log(otpNumber)
    // console.log(localUrl)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/api/auth/verifyEmail`,
        {
          otp: otpNumber,
          _id: user?._id || localStorage.getItem("id"),
        }
      );

      // console.log("API hit hue=====>", res)

      if (res.data?.status) {
        toast.success("Email Verified Successfully!");
        localStorage.removeItem("otpModalStatus");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        dispatch(closeOtpModal());
        // setShowOtpModal(false)

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error");
    }
  };

  const resendOtpHandler = async () => {
    // console.log(user)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/api/auth/resend-otp`,
        user
      );
      // console.log(response)
      toast.success("Email send successfully!");
    } catch (error) {
      // console.log(error?.response)
      toast.error("Email Not send");
    }
  };

  if (!otpModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Enter OTP for {user?.email || localStorage.getItem("email")}
        </h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border rounded p-2 w-full mb-2"
          value={otpNumber}
          onChange={(e) => setOtpNumber(e.target.value)}
        />
        <Link onClick={resendOtpHandler}>Resend OTP</Link>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Verify
          </button>
          <button
            onClick={() => {
              dispatch(closeOtpModal());
              localStorage.removeItem("otpModalStatus");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
