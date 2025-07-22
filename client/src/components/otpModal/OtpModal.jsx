import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function OtpModal() {
  const { setShowOtpModal, user} = useContext(UserContext)
  const [otpNumber, setOtpNumber] = useState("");
  const navigate = useNavigate()

  const handleVerify = async () => {
    console.log(user)
    console.log(otpNumber)

    try {
        const res = await axios.post('https://hackathon-sage-zeta.vercel.app/api/auth/verifyEmail', {
            otp: otpNumber,
            _id : user._id
        })

        console.log("API hit hue=====>", res)

        if(res.data?.status){
            toast.success("Email Verified Successfully!")
            setShowOtpModal(false)
          navigate('/login')
        }

    } catch (error) {
        toast.error(error.responsse?.data?.message || "Server Error")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Enter OTP for {user?.email}
        </h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border rounded p-2 w-full mb-4"
          value={otpNumber}
          onChange={(e) => setOtpNumber(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
          <button
            onClick={() => setShowOtpModal(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
