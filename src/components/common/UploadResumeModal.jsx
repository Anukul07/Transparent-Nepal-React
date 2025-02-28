import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function UploadResumeModal({ onClose, selectedJob }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Only PDF files are allowed.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/users/uploadResume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
      setUploadSuccess(true);
      setError("");

      // Fetch user details to get email and send email
      const userResponse = await axios.get(
        `http://localhost:3002/api/v1/users/${userId}`
      );
      const user = userResponse.data.data.user;
      const userEmail = user.email;
      const resumeFileName = response.data.file;

      // Send email logic
      await sendUploadConfirmationEmail(userEmail, resumeFileName);
      console.log(selectedJob);
      // await axios.post("http://localhost:3002/api/v1/users/appliedJobs", {
      //   userId: userId,
      //   jobId: selectedJob._id,
      // });

      setTimeout(() => {
        onClose();
        navigate("/Explore");
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Failed to upload resume.");
      setUploadSuccess(false);
    }
  };
  const sendUploadConfirmationEmail = async (userEmail, resumeFileName) => {
    try {
      await axios.post("http://localhost:3002/api/v1/users/sendUploadEmail", {
        email: userEmail,
        fileName: resumeFileName,
      });
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      setError("Resume uploaded, but failed to send email.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-90">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Upload Resume</h2>
          <button onClick={onClose} className="cursor-pointer">
            <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
          </button>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mt-4 w-full border p-2 rounded-lg"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {selectedFile && (
          <p className="text-green-600 text-sm mt-2">
            Selected: {selectedFile.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
        >
          Upload
        </button>

        {uploadSuccess && (
          <p className="text-green-600 text-sm mt-4">
            Resume uploaded successfully!
          </p>
        )}
      </div>
    </div>
  );
}
