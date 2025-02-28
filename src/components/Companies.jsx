import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import "./../index.css";
import { useNavigate } from "react-router-dom";
import NoToken from "./common/NoToken";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/api/v1/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const sortedCompanies = response.data.companies.sort((a, b) =>
            a.companyName.localeCompare(b.companyName)
          );
          setCompanies(sortedCompanies);
        } else {
          setAuthError(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setAuthError(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  }, [navigate]);

  if (authError) {
    return <NoToken />;
  }

  return (
    <>
      <Navigation />
      <div className="w-screen h-[86vh]  flex items-center justify-center">
        <div className="w-[80%] h-[90%] bg-white p-6 rounded-2xl border-1 overflow-y-auto custom-scrollbar-one">
          {/* Container for all company cards */}
          <div className="space-y-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-[#f1f1f0] p-6 rounded-xl  shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
              >
                {/* Company Logo and Name */}
                <div className="flex items-center mb-4">
                  <img
                    src={`http://localhost:3002/uploads/${company.companyLogo}`}
                    alt={company.companyName}
                    className="w-[60px] h-[60px] object-cover mr-6"
                  />
                  <h3 className="text-xl font-bold text-black">
                    {company.companyName}
                  </h3>
                </div>

                {/* Company Description */}
                <p className="text-gray-700 text-sm mb-4 text-justify">
                  {company.companyDescription}
                </p>

                {/* Job Listings */}
                <div>
                  <p className="font-semibold text-lg mb-2">
                    Jobs posted by the company:
                  </p>
                  <div className="space-y-4">
                    {company.jobListings.map((job) => (
                      <button
                        key={job._id}
                        className="w-full text-left py-3 px-6 bg-gray-100 rounded-lg text-black hover:bg-gray-200 transition duration-200"
                      >
                        <div className="flex justify-between">
                          <span className="font-semibold">{job.jobName}</span>
                          <span className="text-sm text-gray-500">
                            {job.jobLocation}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.salaryRange}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
