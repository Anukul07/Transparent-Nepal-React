import { useState, useEffect } from "react";
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoToken from "./common/NoToken";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [authError, setAuthError] = useState(false);
  const handleExploreClick = () => {
    navigate("/explore");
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or Token is missing.");
      setAuthError(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (data.status === "success") {
          const user = data.data.user;

          setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phoneNumber,
          });

          if (user.profilePicture) {
            setImage(`http://localhost:3002/uploads/${user.profilePicture}`);
          } else {
            setImage(null);
          }
        } else {
          console.error("Failed to fetch user data.");
          setAuthError(true); // Set authError if fetching fails
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or Token is missing.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phone);

    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput.files[0]) {
      formDataToSend.append("profilePicture", imageInput.files[0]);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3002/api/v1/users/updateWithImage`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {
        setUpdateMessage("Profile updated successfully!");
        setFormData({
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
          phone: data.data.user.phoneNumber,
        });

        if (data.data.user.profilePicture) {
          setImage(
            `http://localhost:3002/uploads/${data.data.user.profilePicture}`
          );
        } else {
          fetchUserData();
        }
        setTimeout(() => {
          navigate("/explore");
        }, 2000);
      } else {
        console.error("Failed to update profile:", data);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or Token is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3002/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {
        const user = data.data.user;

        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phoneNumber,
        });

        if (user.profilePicture) {
          setImage(`http://localhost:3002/uploads/${user.profilePicture}`);
        } else {
          setImage(null);
        }
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  if (authError) {
    return <NoToken />;
  }

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center min-h-[100vh] bg-gray-100">
        <div className="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
          <button
            onClick={handleExploreClick}
            className="absolute top-4 right-4 cursor-pointer flex items-center px-4 py-2 bg-[#07798A] text-white rounded-lg shadow-md hover:bg-[#065c6e] transition"
          >
            <span className="mr-2">&#8592;</span> Explore
          </button>

          <div className="flex justify-center mb-6">
            <label className="cursor-pointer relative block">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <div className="w-40 h-40 rounded-full border-4 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-200 shadow-md">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-center">
                    Click to upload Profile Picture
                  </span>
                )}
              </div>
            </label>
          </div>

          <div className="space-y-4">
            {[
              { label: "First Name", name: "firstName", editable: true },
              { label: "Last Name", name: "lastName", editable: true },
              { label: "Email", name: "email", editable: false },
              { label: "Phone Number", name: "phone", editable: false },
            ].map(({ label, name, editable }, index) => (
              <div key={index}>
                <label className="block text-gray-700 font-semibold">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#07798A] ${
                    editable ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!editable}
                />
              </div>
            ))}
          </div>

          {updateMessage && (
            <div className="text-center mb-4 text-green-600 font-semibold">
              {updateMessage}
            </div>
          )}
          <div className="mt-6 text-center">
            <button
              className="w-full px-6 py-3 cursor-pointer text-white font-semibold bg-[#07798A] rounded-lg shadow-md hover:bg-[#065c6e] transition transform hover:scale-105"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
