import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessDialog = ({ message, showDialog, onClose }) => {
  useEffect(() => {
    if (showDialog) {
      setTimeout(() => {}, 2000);
    }
  }, [showDialog]);

  return (
    <>
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-80 flex justify-center items-center">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md text-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl text-green-500">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#63E6BE" }}
              />
            </div>
            <h2 className="text-xl font-bold mt-4">{message}</h2>
            <p className="text-lg text-gray-500 mt-2">
              Redirecting to login page...
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SuccessDialog;
