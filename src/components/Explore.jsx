import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeAgo } from "../utils/timeUtils";
import { Search, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../index.css";

export default function Explore() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeButton, setActiveButton] = useState("jobs");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [jobSearchInput, setJobSearchInput] = useState(""); // Separate state for job search input
  const [locationSearchInput, setLocationSearchInput] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/v1/jobs");
      if (response.data.success) {
        const sortedJobs = response.data.jobs.sort((a, b) => {
          const jobNameA = a.jobName.toUpperCase();
          const jobNameB = b.jobName.toUpperCase();
          if (jobNameA < jobNameB) return -1;
          if (jobNameA > jobNameB) return 1;
          return 0;
        });
        setJobs(sortedJobs);
        if (sortedJobs.length > 0) {
          setSelectedJob(sortedJobs[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/v1/savedJobs"
      ); // Assuming a savedJobs endpoint
      if (response.data.success) {
        const sortedJobs = response.data.jobs.sort((a, b) => {
          const jobNameA = a.jobName.toUpperCase();
          const jobNameB = b.jobName.toUpperCase();
          if (jobNameA < jobNameB) return -1;
          if (jobNameA > jobNameB) return 1;
          return 0;
        });
        setJobs(sortedJobs);
        if (sortedJobs.length > 0) {
          setSelectedJob(sortedJobs[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  useEffect(() => {
    if (activeButton === "jobs") {
      fetchJobs(); // Fetch jobs by default
    } else {
      fetchSavedJobs(); // Fetch saved jobs
    }
  }, [activeButton]);

  return (
    <>
      <Navigation />

      <div>
        {/* container for search box */}
        <div className="lg:min-h-[10vh] w-full flex flex-col md:flex-row md:items-center md:justify-center p-4 gap-4">
          {/* Job Search Input */}
          <div className="relative w-[30%]">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Enter job title..."
              value={jobSearchInput}
              onChange={(e) => setJobSearchInput(e.target.value)}
              onFocus={() => setShowJobSuggestions(true)}
              onBlur={() => setTimeout(() => setShowJobSuggestions(false), 200)}
              className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 focus:outline-none rounded-md"
            />
            {showJobSuggestions && (
              <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto z-10">
                {jobs.slice(0, 4).map((job, index) => (
                  <li
                    key={index}
                    className="p-2 text-gray-700 hover:bg-gray-300 cursor-pointer"
                    onClick={() => setJobSearchInput(job.jobName)}
                  >
                    {job.jobName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location Search Input */}
          <div className="relative w-full md:w-1/3">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Enter location..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowLocationSuggestions(false), 200)
              }
              className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 focus:outline-none rounded-md"
            />
            {showLocationSuggestions && (
              <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto z-10">
                {[...new Set(jobs.map((job) => job.jobLocation))]
                  .slice(0, 2)
                  .map((location, index) => (
                    <li
                      key={index}
                      className="p-2 text-gray-700 hover:bg-gray-300 cursor-pointer"
                      onClick={() => setLocationSearchInput(location)}
                    >
                      {location}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        {/* container for job finds */}
        <div className=" lg:min-h-[100vh] w-screen flex flex-col ">
          {/* div for buttons of job finds */}
          <div className="flex justify-center gap-3 h-[8vh]">
            <button
              className={`relative text-md cursor-pointer font-semibold pr-3 border-r-2 border-gray-300 flex items-center gap-2 text-gray-800 hover:text-gray-800 focus:outline-none group ${
                activeButton === "jobs" ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setActiveButton("jobs")}
            >
              <FontAwesomeIcon
                className="mr-1"
                icon={faSuitcase}
                size="sm"
                style={{ color: "#07798a" }}
              />
              Jobs
              {/* Underline Effect */}
              <span
                className={`absolute bottom-[-3px] left-0 w-full h-[4px] bg-[#07798A] origin-left transition-all duration-300 ${
                  activeButton === "jobs"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </button>

            <button
              className={`relative text-md font-semibold cursor-pointer pr-3 flex items-center gap-2 text-gray-800 hover:text-gray-800 focus:outline-none group ${
                activeButton === "savedJobs" ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setActiveButton("savedJobs")}
            >
              <FontAwesomeIcon
                className="mr-1"
                icon={faBookmark}
                size="xs"
                style={{ color: "#07798a" }}
              />
              Saved Jobs
              {/* Underline Effect */}
              <span
                className={`absolute bottom-[-3px] left-0 w-full h-[4px] bg-[#07798A] origin-left transition-all duration-300 ${
                  activeButton === "savedJobs"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </button>
          </div>
          {/* div to display jobs */}
          <div className="w-[100%] h-[94vh] mt-2 flex justify-center">
            {/* job mini display */}
            {/* Left Box: Job List */}
            <div className="w-[30%] h-[95%] hide-scrollbar overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className={`bg-white p-4 rounded-xl shadow-lg mt-1 cursor-pointer transition hover:bg-gray-200 
              hover:shadow-xl ${
                selectedJob?._id === job._id
                  ? "border-2 border-[#0000008b]"
                  : "border border-transparent"
              }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={`http://localhost:3002/uploads/${job.companyId.companyLogo}`}
                      alt="Company Logo"
                      className="w-10 h-10 mt-2"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{job.jobName}</h3>
                      <p className="text-lg text-gray-600">
                        {job.companyId.companyName}
                      </p>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">
                        ⭐ {job.companyId.companyRatings}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{job.jobLocation}</p>
                  <div className="flex justify-between">
                    <p className="text-green-600 font-medium">
                      Rs&nbsp;
                      {job.salaryRange}
                    </p>
                    <p className="text-sm text-gray-500">
                      {calculateTimeAgo(job.updatedAt)}{" "}
                      {/* Using the utility function */}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Box: Selected Job Details */}
            <div className="w-[50%] h-[95%] border-2 rounded-xl ml-4 mt-1 flex items-center custom-scrollbar-one justify-center overflow-y-auto">
              {selectedJob ? (
                <div className=" px-6 py-4 rounded-xl w-[100% ] h-[100%]">
                  {/* bigger div for top part */}
                  <div className="h-[35%] w-[100%]  border-b border-gray-300">
                    {/* top */}
                    {/* work from this div */}
                    <div className="w-[100%] h-[60%]  flex">
                      {/* div for image */}
                      <div className="w-[18%] p-2">
                        <img
                          src={`http://localhost:3002/uploads/${selectedJob.companyId.companyLogo}`}
                          alt="Company Logo"
                          className="w-40 h-30"
                        />
                      </div>
                      <div className="flex flex-col w-[60%] pl-2 justify-around">
                        <h2 className="text-2xl font-bold">
                          {selectedJob.jobName}
                        </h2>
                        <p className="text-xl text-gray-600">
                          {selectedJob.companyId.companyName}
                        </p>
                        <span className="text-lg w-fit bg-gray-200 px-3 py-1 rounded-md">
                          ⭐ {selectedJob.companyId.companyRatings}
                        </span>
                      </div>
                      <div className="w-[20%] flex p-1">
                        <button className=" mr-4 mt-1 h-fit w-fit cursor-pointer">
                          <FontAwesomeIcon
                            icon={faBookmarkRegular}
                            size="xl"
                            style={{ color: "#000000" }}
                          />
                        </button>
                        <button className="px-4 py-2 h-fit w-fit cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700  ">
                          <FontAwesomeIcon
                            icon={faBoltLightning}
                            style={{ color: "#000000" }}
                            size="sm  "
                            className="mr-2"
                          />
                          Apply
                        </button>
                      </div>
                    </div>
                    {/* bottom */}
                    <div className=" h-[20%] flex flex-col px-2">
                      {/* div for location */}
                      <div>
                        <p className="text-gray-600 mt-4 text-xl">
                          {selectedJob.jobLocation}
                        </p>
                      </div>
                      {/* div for salary and time */}
                      <div className="flex justify-between">
                        <p className="text-green-600 font-semibold text-xl">
                          Rs&nbsp;{selectedJob.salaryRange}
                        </p>
                        <p className="text-lg text-gray-500">
                          {calculateTimeAgo(selectedJob.updatedAt)}{" "}
                          {/* Using the utility function */}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">Job Description</h3>
                    <p className="text-gray-600 mt-2 text-lg">
                      {selectedJob.jobDescription}
                    </p>
                  </div>

                  {/* Border line */}
                  <div className="border-t border-gray-300 mt-4"></div>

                  {/* Company Description */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">About the Company</h3>
                    <p className="text-gray-600 mt-2 text-lg">
                      {selectedJob.companyId.companyDescription}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-xl">
                  Click on a job to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
