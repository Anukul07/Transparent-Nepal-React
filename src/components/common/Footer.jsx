import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
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
          Terms of Use <span className="text-black-500"> | </span> Privacy & Ad
          Choices
        </p>
      </div>
    </footer>
  );
}
