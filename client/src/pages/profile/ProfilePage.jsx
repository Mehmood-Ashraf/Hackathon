import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
//   console.log(user)

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl text-gray-600 pt-16">
        User not logged in
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl pt-28">
      <div className="flex flex-col items-center shadow-lg">
        {/* User Avatar */}
        <img
          src={user.img || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-md object-cover mb-4"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800">
          {user.userName || "No Name Provided"}
        </h2>

        {/* Email */}
        <p className="text-gray-500 mt-1">
          {user.email || "No Email Provided"}
        </p>

        {/* Divider */}
        <div className="w-full border-t my-6 border-gray-200"></div>

        {/* Additional Info */}
        <div className="w-full space-y-3">
          <div className="text-gray-700">
            <span className="font-semibold">Username:</span>{" "}
            {user.userName || "N/A"}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Phone:</span>{" "}
            {user.phone || "Not Provided"}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Bio:</span>{" "}
            {user.bio || "This user has not added a bio yet."}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">City:</span>{" "}
            {user.city || "This user has not added a bio yet."}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Country:</span>{" "}
            {user.country || "This user has not added a bio yet."}
          </div>
          {/* You can add more fields here if needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
