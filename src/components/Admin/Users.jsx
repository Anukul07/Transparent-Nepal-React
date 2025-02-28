import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonArrowDownToLine } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoToken from "../common/NoToken";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState({}); // Store job details by ID
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
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
        } else {
          console.error("error while fetching the users", error);
        }
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async (jobId) => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/jobs/${jobId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch job details for ${jobId}`);
        }
        const data = await response.json();
        setJobs((prevJobs) => ({ ...prevJobs, [jobId]: data.job }));
      } catch (error) {
        console.error(`Error fetching job details for ${jobId}:`, error);
      }
    };

    users.forEach((user) => {
      user.savedJobs.forEach((jobId) => {
        if (!jobs[jobId]) {
          fetchJobDetails(jobId);
        }
      });
    });
  }, [users, jobs]);

  const handleDeactivate = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3002/api/v1/users/${userId}/deactivate`,
        {}, // Empty data object for PATCH requests
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the UI (e.g., refetch users or update the user's status in the state)
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, active: false } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deactivating user:", error);
      // Handle error (e.g., show a message to the user)
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
