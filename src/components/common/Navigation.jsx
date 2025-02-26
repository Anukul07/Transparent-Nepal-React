import { NavLink, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
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

      <div className="h-[100%] w-[25%] bg-green-400"></div>
    </div>
  );
}
