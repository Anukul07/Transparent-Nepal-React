import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Handle the dropdown visibility timing
  useEffect(() => {
    let timeout;
    if (isHovered) {
      // Show the dropdown when hover starts
      timeout = setTimeout(() => setIsDropdownVisible(true), 0); // Delay dropdown for smooth appearance
    } else {
      // Hide the dropdown after 3 seconds
      timeout = setTimeout(() => setIsDropdownVisible(false), 1000);
    }

    return () => clearTimeout(timeout); // Clean up timeout on hover end
  }, [isHovered]);
  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Navigate back to the login page
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
    <div className="w-screen h-[14vh]  flex border-b relative">
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
                {/* Grey underline on hover */}
                <span className="absolute left-0 bottom-[-30px] w-0 h-[5px] bg-gray-500 transition-all duration-300 group-hover:w-full"></span>

                {/* Green underline if active */}
                {isActive && (
                  <span className="absolute left-0 bottom-[-30px] w-full h-[5px] bg-[#07798A]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="h-[100%] w-[25%]  flex justify-center items-center relative">
        <button
          className="border-1 px-4 py-2 flex items-center" // Add flex for image
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {userData?.profilePicture && ( // Conditionally render image
            <img
              src={`http://localhost:3002/uploads/${userData.profilePicture}`}
              alt="Profile"
              className="w-9 h-9 rounded-full mr-2" // Adjust image styles
            />
          )}
          {userData?.firstName || "User name"}{" "}
          {/* Use firstName if available */}
        </button>

        {/* Dropdown Menu (appears after hover and stays for 3 seconds) */}
        {isDropdownVisible && (
          <div className="absolute top-[100%] mt-2 w-auto bg-white border border-gray-300 shadow-md p-2 rounded-lg">
            <button
              onClick={handleLogout} // Placeholder for logout action
              className="w-full text-red-500 hover:bg-gray-200 py-2 rounded-lg text-center"
            >
              Logout
            </button>
            <button className="w-full text-[#07798A] hover:bg-gray-200 py-2 rounded-lg text-center">
              Profile
            </button>
          </div>
        )}
      </div>
      );
    </div>
  );
}
