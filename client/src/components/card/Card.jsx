import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Card = () => {
    const {user} = useContext(UserContext)

    if(!user) {
        return <p>User is not Available</p>
    }
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={user.img ? user?.img : null} alt={user?.userName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{user?.userName}</h3>
        <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          click
        </button>
      </div>
    </div>
  );
};

export default Card;
