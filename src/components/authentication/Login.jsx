import { useState } from "react";
import { motion } from "framer-motion";
import Registration from "./Registration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <header
        className="w-full min-h-[11vh] md:min-h-[12vh] lg:min-h-[15vh] 
            relative flex justify-center items-center overflow-visible"
      >
        <div
          className="absolute bottom-0 left-1/2 w-1/2 h-[2px] 
            bg-gradient-to-r from-transparent to-cyan-500"
        ></div>

        <img
          src="src/assets/authentication/logo.png"
          alt="logo"
          className="absolute bottom-[-15%] sm:bottom-[-20%] md:bottom-[-10%]
              max-w-[50%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[25%] h-auto"
        />
      </header>

      <main className="w-full h-[70vh] md:min-h-[67vh] lg:min-h-[70vh] flex justify-center items-center">
        <motion.div
          className="w-[80%] h-[90%] sm:w-[60%] sm:h-[90%] md:w-[50%] md:h-[90%] lg:w-[40%] lg:h-[90%] rounded-2xl shadow-2xl shadow-black-50 flex flex-col items-center justify-evenly"
          key={isLoginView ? "login" : "registration"} // Key to trigger animation based on view
          initial={{ x: 300, opacity: 0 }} // Start the view from right (off-screen)
          animate={{ x: 0, opacity: 1 }} // Slide to its original position with fade-in
          exit={{ x: -300, opacity: 0 }} // Slide the view out to the left (off-screen) while fading out
          transition={{ duration: 0.5 }} // Smooth swipe transition
        >
          {isLoginView ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-xl font-bold">
                  Create an account or Sign in
                </h1>
                <p className="text-md text-gray-600">
                  By logging in you agree to our{" "}
                  <span className="text-blue-500 underline hover:cursor-pointer">
                    privacy
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-500 underline hover:cursor-pointer">
                    policy
                  </span>
                </p>
              </div>
              {/* Form Container */}
              <div className="w-[90%] h-[60%] flex flex-col items-center justify-evenly">
                <div className="flex flex-col gap-4 w-[100%] items-center">
                  {/* Facebook Button */}
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-3 w-[100%] bg-blue-400 text-white rounded-lg shadow-md
               hover:bg-blue-500 hover:text-white focus:outline-none"
                  >
                    <img
                      src="src/assets/authentication/facebook.png"
                      alt="Facebook Logo"
                      className="w-8 h-8"
                    />
                    Login with Facebook
                  </button>

                  {/* Google Button */}
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-3 w-[100%] bg-[#d0d0d0] text-white rounded-lg shadow-md
               hover:bg-[#989595] hover:text-white focus:outline-none"
                  >
                    <img
                      src="src/assets/authentication/google.png"
                      alt="Google Logo"
                      className="w-8 h-8"
                    />
                    Login with Google
                  </button>
                </div>
                <div className="flex flex-col w-[100%] justify-around">
                  <div className="flex flex-col text-lg h-[50%] w-[100%]">
                    <label className="text-xl">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
                    />
                  </div>
                  {/* Password */}
                  <div className="flex flex-col text-lg  h-[50%] w-[100%]">
                    <label className="text-xl">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <button className="h-8 bg-[#07798A] text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 text-md">
                  Log In
                </button>
                <div className="mt-2">
                  {" "}
                  {/* Added margin for spacing */}
                  <p className="text-lg text-gray-600">
                    Not a member?{" "}
                    <span
                      className="text-blue-500 underline hover:cursor-pointer"
                      onClick={toggleView} // Switch to Registration view on click
                    >
                      Join Us
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Registration toggleView={toggleView} />
          )}
        </motion.div>
      </main>

      <footer className="w-full min-h-[20vh] md:min-h-[18vh] lg:min-h-[15vh] flex flex-col items-center">
        {/* First Div: Button */}
        <div className="mb-6 h-[40%]">
          {" "}
          {/* Adjusted margin for better spacing */}
          <button className="flex items-center gap-2 text-lg text-gray-800 hover:text-gray-800 focus:outline-none relative group">
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-800" />{" "}
            {/* FontAwesomeIcon usage */}
            Back to Homepage
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#07798A] scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Copyright © 2025. TransparentNepal Pvt.Ltd.
          </p>
          <p className="text-blue-500 text-md underline hover:cursor-pointer">
            Terms of Use <span className="text-black-500"> | </span> Privacy &
            Ad Choices
          </p>
        </div>
      </footer>
    </div>
  );
}
