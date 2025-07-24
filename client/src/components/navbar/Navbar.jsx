import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { theme, toogleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const logoutUser = await axios.post(
        "https://hackathon-sage-zeta.vercel.app/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (logoutUser) {
        toast.success("UserLoggedout Successfully!");
        localStorage.removeItem("token")
      }
      setUser(null);
    } catch (error) {
      toast.error("Failed to logout!");
      console.log(error);
    }
  };

  return (
    <nav
      className={`${
        theme === "dark" ? " bg-gray-900 text-white" : "bg-white text-black"
      } dark:text-white shadow-md fixed w-full z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
          <div className="flex-shrink-0 text-xl font-bold">MyLogo</div>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex gap-8">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
            <a href="#" className="hover:text-blue-500">
              Services
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <img
                  className="rounded-full"
                  src={
                    user?.img
                      ? user?.img
                      : "/default-user.png"
                  }
                  alt="User"
                  width={40}
                  height={40}
                />
                <span>{user.userName}</span>
                <button
                  className="hidden md:inline-block px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer "
                  onClick={logoutHandler}
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="hidden md:inline-block px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="hidden md:inline-block px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
            <button
              onClick={toogleTheme}
              className="cursor-pointer border rounded-full text-sm hover:bg-gray-100 dark:bg-gray-800 px-1 py-1"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden text-2xl ml-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 transition-all duration-300">
          <a href="#" className="block py-1 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="block py-1 hover:text-blue-500">
            About
          </a>
          <a href="#" className="block py-1 hover:text-blue-500">
            Services
          </a>
          <a href="#" className="block py-1 hover:text-blue-500">
            Contact
          </a>
          <div className="flex gap-2 pt-2">
            {user ? (
              <>
                <img
                  className="rounded-full"
                  src={
                    user?.img
                      ? `http://localhost:5000/${user.img
                          .replace("public\\", "")
                          .replace("\\", "/")}`
                      : "/default-user.png"
                  }
                  alt="User"
                  width={40}
                  height={40}
                />
                <span>{user.userName}</span>
                <button
                  className=" md:hidden px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer "
                  onClick={logoutHandler}
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
            {/* <button className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" onClick={() => navigate('/signup')}>
              Sign Up
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
}
