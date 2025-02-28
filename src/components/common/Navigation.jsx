import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => setIsDropdownVisible(true), 0);
    } else {
      timeout = setTimeout(() => setIsDropdownVisible(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  const fetchUserData = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId && token) {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="w-screen h-[14vh] flex border-b relative">
      <div className="h-[100%] w-[30%] flex justify-center">
        <img
          src="src/assets/navigation/logo1.png"
          alt=""
          className="w-[320px] h-[100px]"
        />
      </div>
      <div className="h-[100%] w-[45%] flex items-center justify-around relative">
        {[
          { name: "Explore", path: "/explore" },
          { name: "Companies", path: "/companies" },
          { name: "FAQs", path: "/faq" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `relative text-[#07798A] text-xl font-semibold px-4 py-2 group`
            }
          >
            {({ isActive }) => (
              <>
                {item.name}
                <span className="absolute left-0 bottom-[-30px] w-0 h-[5px] bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
                {isActive && location.pathname !== "/profile" && (
                  <span className="absolute left-0 bottom-[-30px] w-full h-[5px] bg-[#07798A]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="h-[100%] w-[25%]  flex justify-center items-center relative">
        <button
          className="border-1 px-4 py-2 flex items-center text-xl cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {userData?.profilePicture && (
            <img
              src={`http://localhost:3002/uploads/${userData.profilePicture}`}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2"
            />
          )}
          {userData?.firstName || "User name"}
        </button>

        {isDropdownVisible && (
          <div className="absolute top-[100%] mt-2 w-auto bg-white border border-gray-300 shadow-md p-2 rounded-lg cursor-pointer">
            <button
              onClick={handleLogout}
              className="w-full text-red-500 cursor-pointer hover:bg-gray-200 py-2 rounded-lg text-center flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="sm"
                style={{ color: "#ab0000" }}
                className="mr-2"
              />
              Logout
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-[#07798A] cursor-pointer hover:bg-gray-200 py-2 rounded-lg text-center flex items-center justify-center mt-2"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="xs"
                style={{ color: "#07798a" }}
                className="mr-2"
              />
              Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
