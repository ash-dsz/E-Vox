import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Candidate() {
  const [election, setElection] = useState("");
  const [role, setRole] = useState("");
  const [candidateImg, setCandidateImg] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateClass, setCandidateClass] = useState("");
  const status = 1;

  // http://localhost:8080/candidate/addcandidate

  const saveCandidate = (e) => {
    e.preventDefault();

    if (!election || !role || !candidateName || !candidateClass) {
      toast.error("All fields are required");
      return;
    }

    const data = {
      evoxId: election,
      roleId: role,
      candidateName: candidateName,
      candidateClass: candidateClass,
      candidateImg: candidateImg,
      status: status,
    };

    fetch("http://localhost:8080/candidate/addcandidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      toast.success("🦄 New Candidate Added!");
      setElection("");
      setRole("");
      setCandidateImg("");
      setCandidateName("");
      setCandidateClass("");
    });
  };
  const [electionList, setElectionList] = useState([]);
  var [roleList, setRoleList] = useState([]);
  //fetch all elections created to display option for select
  useEffect(() => {
    fetch("http://localhost:8080/election/getall")
      .then((res) => res.json())
      .then((result) => {
        setElectionList(result);
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  });
  useEffect(() => {
    fetch("http://localhost:8080/roles/getall")
      .then((res) => res.json())
      .then((result) => {
        setRoleList(result);
        const selectedRoles = result.filter((role) => role.evoxId == election);
        setRoleList(selectedRoles);
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  }, [election]);

  return (
    <div className="app-container content-around ">
      <form className="mx-8 my-12">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Election
        </label>
        <select
          id="election"
          onChange={(e) => setElection(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Election</option>
          {electionList.map((election, index) => (
            <option key={index} value={election.electionId}>
              {election.electionName}
            </option>
          ))}
        </select>
        <label
          htmlFor="countries"
          className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Candidate Role
        </label>
        <select
          id="countries"
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Role</option>
          {roleList.map((role, index) => (
            <option key={index} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </select>
        <div className="mb-5 mt-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Candidate Image
          </label>
          <input
            onChange={(e) => {
              setCandidateImg(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            accept="image/jpeg, image/png, image/gif"
            type="file"
          />
        </div>
        <div className="mb-5 mt-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm mt-5 font-medium text-gray-900 dark:text-white"
          >
            Candidate Name
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setCandidateName(e.target.value)}
            value={candidateName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Candidate Role"
            required
          />
        </div>
        <div className="mb-5 mt-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm mt-5 font-medium text-gray-900 dark:text-white"
          >
            Candidate Class
          </label>
          <input
            type="text"
            id="name"
            value={candidateClass}
            onChange={(e) => {
              setCandidateClass(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Candidate Role"
            required
          />
        </div>
        <button
          type="button"
          onClick={saveCandidate}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Candidate;
