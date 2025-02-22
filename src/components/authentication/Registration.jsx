import { motion } from "framer-motion";

export default function Registration({ toggleView }) {
  return (
    <motion.div
      className="w-[100%] h-[100%] sm:w-[100%] sm:h-[100%] md:w-[100%] md:h-[100%] lg:w-[100%] lg:h-[100%] rounded-2xl shadow-2xl shadow-black-50 flex flex-col items-center justify-evenly"
      key="registration"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold">Glad you are joining us</h1>
      </div>

      {/* Form Container */}
      <div className="w-[90%]  flex flex-col items-center justify-evenly">
        <div className="flex flex-col gap-4 w-[100%] items-center">
          {/* First Name */}
          <div className="flex flex-col text-lg h-[50%] w-[100%]">
            <label className="text-xl">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col text-lg h-[50%] w-[100%]">
            <label className="text-xl">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col text-lg h-[50%] w-[100%]">
            <label className="text-xl">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-lg h-[50%] w-[100%]">
            <label className="text-xl">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100 h-10 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-lg placeholder:text-sm placeholder:text-left placeholder:opacity-70"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-lg h-[50%] w-[100%]">
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
          Register
        </button>
        <div className="mt-2">
          <p className="text-lg text-gray-600">
            Already a member?{" "}
            <span
              className="text-blue-500 underline hover:cursor-pointer"
              onClick={toggleView} // Switch to Login view on click
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
