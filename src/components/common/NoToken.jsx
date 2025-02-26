import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NoToken() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-2xl font-semibold">Unauthorized Access.</p>
        <p className="text-gray-600 mt-2">Redirecting to login...</p>
      </div>
    </div>
  );
}
