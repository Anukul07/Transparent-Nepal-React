import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonArrowDownToLine } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoToken from "../common/NoToken";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState({});
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3002/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          setAuthFailed(true);
        }
      }
    };

    fetchUsers();
  }, []);

  // Fetch job details only once per job ID
  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobIdsToFetch = new Set();
      users.forEach((user) => {
        user.savedJobs.forEach((jobId) => {
          if (!jobs[jobId]) {
            jobIdsToFetch.add(jobId);
          }
        });
      });

      if (jobIdsToFetch.size === 0) return; // No new jobs to fetch

      try {
        const jobRequests = [...jobIdsToFetch].map((jobId) =>
          fetch(`http://localhost:3002/api/v1/jobs/${jobId}`).then((res) =>
            res.json()
          )
        );

        const jobResponses = await Promise.all(jobRequests);

        const newJobs = {};
        jobResponses.forEach((jobData, index) => {
          if (jobData && jobData.job) {
            newJobs[[...jobIdsToFetch][index]] = jobData.job;
          }
        });

        setJobs((prevJobs) => ({ ...prevJobs, ...newJobs }));
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [users]); // Depend only on `users`

  const handleDeactivate = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3002/api/v1/users/${userId}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI without refetching everything
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, active: false } : user
        )
      );
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  if (authFailed) {
    return <NoToken />;
  }

  return (
    <div className="h-[60%]  p-4">
      <div className="bg-white rounded-2xl p-4 overflow-y-auto max-h-[90%] shadow-lg">
        {users.map((user) => (
          <div
            key={user._id}
            className=" p-4  mb-4 flex items-start justify-between"
          >
            <div>
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Status:</strong> {user.active ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Saved Jobs:</strong>
              </p>
              <ul>
                {user.savedJobs.map((jobId) => (
                  <li key={jobId}>
                    {jobs[jobId] ? (
                      <>
                        {jobs[jobId].jobName} - {jobs[jobId].jobLocation}
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleDeactivate(user._id)}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-md cursor-pointer flex items-center transition-colors duration-200 "
            >
              <FontAwesomeIcon
                icon={faPersonArrowDownToLine}
                style={{ color: "#ffffff", marginRight: "5px" }}
              />
              Deactivate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
