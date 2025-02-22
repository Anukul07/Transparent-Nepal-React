import { useState } from "react";
import { motion } from "framer-motion"; // For smooth transition
import Registration from "./Registration"; // Import the Registration component

export default function Login() {
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle between views

  // Toggle between login and registration views
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
              <div className="w-[90%] h-[60%] flex flex-col items-center justify-around">
                <div className="flex flex-col gap-4 w-[100%] items-center">
                  {/* Facebook Button */}
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-3 w-[40%] bg-blue-400 text-white rounded-lg shadow-md
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
                    className="flex items-center justify-center gap-2 px-6 py-3 w-[40%] bg-[#d0d0d0] text-white rounded-lg shadow-md
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
                {/* Email */}
                <div className="flex flex-col text-lg h-[25%]">
                  <label className="text-xl">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
                  />
                </div>
                {/* Password */}
                <div className="flex flex-col text-lg h-[25%] ">
                  <label className="text-xl">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <button className="h-8 bg-[#07798A] text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 text-md">
                  Log In
                </button>
                <div className="mt-2">
                  {" "}
                  {/* Added margin for spacing */}
                  <p className="text-sm text-gray-600">
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
            <Registration />
          )}
        </motion.div>
      </main>

      <footer className="bg-black w-full min-h-[23vh]"></footer>
    </div>
  );
}
