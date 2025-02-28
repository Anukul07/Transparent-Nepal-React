import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import Users from "./Admin/Users";
import Company from "./Admin/CompanyAdmin";
import Jobs from "./Admin/Jobs";
import axios from "axios";
import NoToken from "./common/NoToken";

export default function Admin() {
  const [activeComponent, setActiveComponent] = useState("jobs"); // Default to Jobs
  const [userData, setUserData] = useState(null);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
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
        if (error.response && error.response.status === 401) {
          setAuthFailed(true);
        } else {
          console.error("error while fetching the users", error);
        }
      }
    };

    fetchUserData();
  });
  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <Users />;
      case "jobs":
        return <Jobs />;
      case "companies":
        return <Company />;
      default:
        return <Jobs />; // Default to Jobs
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (authFailed) {
    return <NoToken />;
  }

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <aside className="bg-[#008B8B] text-white w-64 p-6 flex flex-col justify-center">
        <nav className="space-y-12">
          <button
            onClick={() => setActiveComponent("users")}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#006666] transition-colors duration-300 ${
              activeComponent === "users" ? "bg-[#006666]" : ""
            }`}
          >
            <FaUser className="text-xl" />
            <span className="text-lg">Users</span>
          </button>
          <button
            onClick={() => setActiveComponent("jobs")}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#006666] transition-colors duration-300 ${
              activeComponent === "jobs" ? "bg-[#006666]" : ""
            }`}
          >
            <FaBriefcase className="text-xl" />
            <span className="text-lg">Jobs</span>
          </button>
          <button
            onClick={() => setActiveComponent("companies")}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#006666] transition-colors duration-300 ${
              activeComponent === "companies" ? "bg-[#006666]" : ""
            }`}
          >
            <FaBuilding className="text-xl" />
            <span className="text-lg">Companies</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-6 flex justify-around items-center">
          <img
            src="src\assets\navigation\logo1.png"
            className="w-[30%]"
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-gray-800">Administrator</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              {userData?.profilePicture ? (
                <img
                  src={`http://localhost:3002/uploads/${userData.profilePicture}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-700" />
              )}
              <span className="text-lg text-gray-700">
                {userData?.firstName || "Username"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        </header>
        {renderComponent()}
      </div>
    </div>
  );
}
