import React, { useState, useEffect } from "react";
import axios from "axios";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NoToken from "../common/NoToken";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [authFailed, setAuthFailed] = useState(false);
  const [newJob, setNewJob] = useState({
    jobName: "",
    jobLocation: "",
    salaryRange: "",
    jobDescription: "",
    companyId: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({
    jobName: "",
    jobLocation: "",
    salaryRange: "",
    jobDescription: "",
    companyId: "",
  });

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      if (error.response && error.response.status === 401) {
        setAuthFailed(true);
      } else {
        console.error("error while fetching the users", error);
      }
    }
  };

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3002/api/v1/companies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanies(response.data.companies);
      console.log(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      if (error.response && error.response.status === 401) {
        setAuthFailed(true);
      } else {
        console.error("error while fetching the users", error);
      }
    }
  };

  const handleInputChange = (e, jobState, setJobState) => {
    const { name, value } = e.target;
    setJobState({
      ...jobState,
      [name]: value,
    });
  };

  const handleCreateJob = async () => {
    try {
      await axios.post("http://localhost:3002/api/v1/jobs", newJob, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchJobs();
      setNewJob({
        jobName: "",
        jobLocation: "",
        salaryRange: "",
        jobDescription: "",
        companyId: "",
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job._id);
    setEditedJob({
      jobName: job.jobName,
      jobLocation: job.jobLocation,
      salaryRange: job.salaryRange,
      jobDescription: job.jobDescription,
      companyId: job.companyId,
    });
  };

  const handleUpdateJob = async (id) => {
    try {
      await axios.patch(`http://localhost:3002/api/v1/jobs/${id}`, editedJob, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchJobs();
      setEditingJobId(null);
      setEditedJob({
        jobName: "",
        jobLocation: "",
        salaryRange: "",
        jobDescription: "",
        companyId: "",
      });
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  if (authFailed) {
    return <NoToken />;
  }

  return (
    <div className="h-[80vh] p-4 overflow-y-auto">
      {/* Create Job Form */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          name="jobName"
          value={newJob.jobName}
          onChange={(e) => handleInputChange(e, newJob, setNewJob)}
          placeholder="Job Name"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="jobLocation"
          value={newJob.jobLocation}
          onChange={(e) => handleInputChange(e, newJob, setNewJob)}
          placeholder="Job Location"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="salaryRange"
          value={newJob.salaryRange}
          onChange={(e) => handleInputChange(e, newJob, setNewJob)}
          placeholder="Salary Range"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="jobDescription"
          value={newJob.jobDescription}
          onChange={(e) => handleInputChange(e, newJob, setNewJob)}
          placeholder="Job Description"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64"
        />
        <select
          name="companyId"
          value={newJob.companyId}
          onChange={(e) => handleInputChange(e, newJob, setNewJob)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreateJob}
          className="bg-cyan-700 text-white p-2 rounded-lg hover:bg-cyan-800 transition-colors duration-200"
        >
          Create Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="shadow-2xl p-4 rounded-md">
            {editingJobId === job._id ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="jobName"
                  value={editedJob.jobName}
                  onChange={(e) =>
                    handleInputChange(e, editedJob, setEditedJob)
                  }
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="jobLocation"
                  value={editedJob.jobLocation}
                  onChange={(e) =>
                    handleInputChange(e, editedJob, setEditedJob)
                  }
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="salaryRange"
                  value={editedJob.salaryRange}
                  onChange={(e) =>
                    handleInputChange(e, editedJob, setEditedJob)
                  }
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="jobDescription"
                  value={editedJob.jobDescription}
                  onChange={(e) =>
                    handleInputChange(e, editedJob, setEditedJob)
                  }
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64"
                />
                <select
                  name="companyId"
                  value={editedJob.companyId}
                  onChange={(e) =>
                    handleInputChange(e, editedJob, setEditedJob)
                  }
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleUpdateJob(job._id)}
                  className="bg-green-500 text-white p-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingJobId(null)}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    <strong>Job Name:</strong> {job.jobName}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.jobLocation}
                  </p>
                  <p>
                    <strong>Salary Range:</strong> {job.salaryRange}
                  </p>
                  <p>
                    <strong>Description:</strong> {job.jobDescription}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="bg-gray-100 text-black p-2 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#000000" }}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-gray-100 text-white p-2 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#000000" }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
