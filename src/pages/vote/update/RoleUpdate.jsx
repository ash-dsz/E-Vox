import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function RoleUpdate() {
  const { id } = useParams();
  const [election, setElection] = useState("");
  const [role, setRole] = useState("");
  const [electionList, SetElection] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const status = 1;

  //get data by id
  useEffect(() => {
    fetch(`http://localhost:8080/roles/getroles/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setElection(result.evoxId);
        setRole(result.roleName);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

    fetch("http://localhost:8080/election/getall")
      .then((res) => res.json())
      .then((result) => {
        SetElection(result); // Note the capital 'S' in SetElection
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  }, []); // Empty dependency array for running once on mount

  return (
    <div>
      <div className="app-container content-around">
        <form className="mx-8 my-12">
          <label
            htmlFor="election"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Election
          </label>
          <select
            id="election"
            onChange={(e) => setElection(e.target.value)}
            value={election}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>{election}</option>
            {electionList.map((elections, index) => (
              <option key={index} value={elections.electionId}>
                {elections.electionName}
              </option>
            ))}
          </select>

          <div className="mb-5 mt-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Candidate Role
            </label>
            <input
              type="text"
              id="role"
              //   onChange={(e) => setRole(e.target.value)}
              value={role}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Candidate Role"
              required
            />
          </div>

          <button
            type="submit"
            // onClick={saverole}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoleUpdate;
