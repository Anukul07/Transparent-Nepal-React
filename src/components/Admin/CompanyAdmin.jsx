import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NoToken from "../common/NoToken";

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [authFailed, setAuthFailed] = useState(false);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    companyDescription: "",
    companyLogo: null,
  });
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editedCompany, setEditedCompany] = useState({
    companyName: "",
    companyDescription: "",
    companyLogo: null,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

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
    } catch (error) {
      console.error("Error fetching companies:", error);
      if (error.response && error.response.status === 401) {
        setAuthFailed(true);
      } else {
        console.error("error while fetching the users", error);
      }
    }
  };

  const handleInputChange = (e, companyState, setCompanyState) => {
    const { name, value, files } = e.target;
    setCompanyState({
      ...companyState,
      [name]: files ? files[0] : value,
    });
  };

  const handleCreateCompany = async () => {
    try {
      const formData = new FormData();
      formData.append("companyName", newCompany.companyName);
      formData.append("companyDescription", newCompany.companyDescription);
      if (newCompany.companyLogo) {
        formData.append("companyLogo", newCompany.companyLogo);
      }

      await axios.post("http://localhost:3002/api/v1/companies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCompanies();
      setNewCompany({
        companyName: "",
        companyDescription: "",
        companyLogo: null,
      });
    } catch (error) {
      console.error("Error creating company:", error);
      if (error.response && error.response.status === 401) {
        setAuthFailed(true);
      } else {
        console.error("error while fetching the users", error);
      }
    }
  };

  const handleEditCompany = (company) => {
    setEditingCompanyId(company._id);
    setEditedCompany({
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      companyLogo: null,
    });
  };

  const handleUpdateCompany = async (id) => {
    try {
      const formData = new FormData();
      formData.append("companyName", editedCompany.companyName);
      formData.append("companyDescription", editedCompany.companyDescription);
      if (editedCompany.companyLogo) {
        formData.append("companyLogo", editedCompany.companyLogo);
      }

      await axios.patch(
        `http://localhost:3002/api/v1/companies/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchCompanies();
      setEditingCompanyId(null);
      setEditedCompany({
        companyName: "",
        companyDescription: "",
        companyLogo: null,
      });
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };
  if (authFailed) {
    return <NoToken />;
  }

  return (
    <div className="h-[80vh] p-4 overflow-y-auto">
      <div className="mb-4 flex items-center space-x-4">
        {/* Company Name Input */}
        <input
          type="text"
          name="companyName"
          value={newCompany.companyName}
          onChange={(e) => handleInputChange(e, newCompany, setNewCompany)}
          placeholder="Company Name"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Company Description Input */}
        <input
          type="text"
          name="companyDescription"
          value={newCompany.companyDescription}
          onChange={(e) => handleInputChange(e, newCompany, setNewCompany)}
          placeholder="Company Description"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64" // Wider width
        />

        {/* File Input Styled as Image Placeholder */}
        <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <span className="text-gray-500 text-sm text-center">
            {newCompany.companyLogo ? "Change Logo" : "Upload Logo"}
          </span>
          <input
            type="file"
            name="companyLogo"
            onChange={(e) => handleInputChange(e, newCompany, setNewCompany)}
            className="hidden"
          />
        </label>

        {/* Create Company Button */}
        <button
          onClick={handleCreateCompany}
          className="bg-cyan-700 text-white p-2 rounded-lg hover:bg-cyan-800 transition-colors duration-200"
        >
          Create Company
        </button>
      </div>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company._id}
            className=" p-4 shadow-2xl rounded-md flex items-center justify-between"
          >
            {editingCompanyId === company._id ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="companyName"
                  value={editedCompany.companyName}
                  onChange={(e) =>
                    handleInputChange(e, editedCompany, setEditedCompany)
                  }
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="companyDescription"
                  value={editedCompany.companyDescription}
                  onChange={(e) =>
                    handleInputChange(e, editedCompany, setEditedCompany)
                  }
                  className="border p-2 w-full"
                />
                <input
                  type="file"
                  name="companyLogo"
                  onChange={(e) =>
                    handleInputChange(e, editedCompany, setEditedCompany)
                  }
                  className="mr-2"
                />
                <button
                  onClick={() => handleUpdateCompany(company._id)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCompanyId(null)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p>
                    <strong>Name:</strong> {company.companyName}
                  </p>
                  <p>
                    <strong>Description:</strong> {company.companyDescription}
                  </p>
                </div>
                {company.companyLogo && (
                  <img
                    src={`http://localhost:3002/uploads/${company.companyLogo}`}
                    alt="Company Logo"
                    className="w-[20%]"
                  />
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCompany(company)}
                    className="bg-gray-100 text-black p-2 rounded cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="xl"
                      style={{ color: "#000000" }}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company._id)}
                    className="bg-gray-100 text-white p-2 rounded cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="xl"
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
