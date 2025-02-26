import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className=" h-[16vh] flex flex-col items-center py-2 ">
      <div className=" h-[80%] flex justify-around items-center w-full  ">
        <img src="src\assets\footer\Frame 1.png" className="h-[80%]" alt="" />

        <img src="src\assets\footer\Frame 2.png" className="h-[80%]" alt="" />

        <img src="src\assets\footer\Frame 3.png" className="h-[80%]" alt="" />

        <img src="src\assets\footer\Frame 4.png" className="h-[80%]" alt="" />

        <img src="src\assets\footer\Made easy.png" className="h-[80%]" alt="" />
      </div>

      <div className=" flex">
        <p className="text-sm text-gray-600 ">
          Copyright © 2025. TransparentNepal Pvt.Ltd.
        </p>
        <p className="text-blue-500 text-md ml-4 underline hover:cursor-pointer">
          Terms of Use <span className="text-black-500"> | </span> Privacy & Ad
          Choices
        </p>
      </div>
    </footer>
  );
}
