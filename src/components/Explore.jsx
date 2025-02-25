import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./../index.css";

export default function Explore() {
  const jobs = [
    {
      id: 1,
      company: "TechCorp",
      logo: "",
      rating: 4.5,
      location: "New York, USA",
      salary: "$70k - $90k",
      description: "Looking for a skilled frontend developer...",
    },
    {
      id: 2,
      company: "WebSolutions",
      logo: "",
      rating: 4.2,
      location: "San Francisco, USA",
      salary: "$80k - $100k",
      description: "Seeking a full-stack engineer with React experience...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
    {
      id: 3,
      company: "DataSoft",
      logo: "",
      rating: 4.8,
      location: "Remote",
      salary: "$90k - $120k",
      description: "Hiring a data scientist with expertise in AI and ML...",
    },
  ];

  const [selectedJob, setSelectedJob] = useState(null);

  const handleClick = (job) => {
    setSelectedJob(job);
    console.log("Clicked Job:", job);
  };
  return (
    <>
      <Navigation />

      <div>
        {/* container for search box */}
        <div className="bg-amber-100 lg:min-h-[10vh]">Search Box</div>
        {/* container for job finds */}
        <div className=" lg:min-h-[100vh] w-screen flex flex-col ">
          {/* div for buttons of job finds */}
          <div className="flex justify-center gap-4 h-[6vh]">
            <button>
              <FontAwesomeIcon
                className="mr-1"
                icon={faWandSparkles}
                style={{ color: "#1f938c" }}
              />
              Recommendations
            </button>
            <button>Search</button>
          </div>
          {/* div to display jobs */}
          <div className="w-[100%] h-[94vh] flex justify-center">
            {/* job mini display */}
            {/* Left Box: Job List */}
            <div className="w-[30%] h-[95%] hide-scrollbar overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white p-4 rounded-xl shadow-lg mt-1  cursor-pointer transition hover:bg-gray-200 
                    hover:shadow-xl ${
                      selectedJob?.id === job.id
                        ? "border-2 border-[#0000008b]"
                        : "border border-transparent"
                    }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt="logo"
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="text-lg font-semibold">{job.company}</h3>
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">
                      ⭐ {job.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{job.location}</p>
                  <p className="text-green-600 font-medium">{job.salary}</p>
                  <p className="text-gray-500 mt-2">{job.description}</p>
                </div>
              ))}
            </div>

            {/* Right Box: Selected Job Details */}
            <div className="w-[50%] h-[95%] bg-amber-300 ml-4 mt-1 flex items-center justify-center">
              {selectedJob ? (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedJob.logo}
                      alt="logo"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedJob.company}
                      </h2>
                      <span className="text-sm bg-gray-200 px-3 py-1 rounded-md">
                        ⭐ {selectedJob.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">{selectedJob.location}</p>
                  <p className="text-green-600 font-semibold">
                    {selectedJob.salary}
                  </p>
                  <p className="text-gray-500 mt-4 text-lg">
                    {selectedJob.description}
                  </p>
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
