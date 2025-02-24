import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SuccessDialog from "../common/SuccessDialog";

export default function Registration({ toggleView }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, phoneNumber, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number must be exactly 10 digits.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/users/signup",
        formData
      );

      // Show success dialog upon successful registration
      setShowSuccessDialog(true);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        // Navigate to the login page
        toggleView(); // This will toggle to the login view
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-evenly p-6"
        key="registration"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold">Glad you are joining us</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="w-[90%] flex flex-col gap-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col text-lg w-full">
              <label className="text-xl">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:opacity-70"
              />
            </div>
          ))}
          <button
            type="submit"
            className="h-10 bg-[#07798A] text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 text-md mt-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-lg text-gray-600 mt-2">
          Already a member?{" "}
          <span
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={toggleView}
          >
            Log In
          </span>
        </p>
      </motion.div>

      {showSuccessDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 backdrop-blur-sm pointer-events-none"></div>
      )}
      <SuccessDialog
        showDialog={showSuccessDialog}
        message1={"Your account has been created!"}
        message2={"Redirecting to Login..."}
      />
    </>
  );
}
