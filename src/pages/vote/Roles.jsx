import React, { useState, useEffect } from "react";
import RoleList from "../../component/list/RoleList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Roles() {
  const [election, setElection] = useState("");
  const [role, setRole] = useState("");
  const [electionList, setList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const status = 1;

  const saverole = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!election || !role) {
      // Display an error message or handle the empty fields
      // For example:
      toast.error("Please fill in all the required fields.");
      return; // Exit the function if any field is empty
    }

    // All validations passed, proceed with saving the role
    const data = { evoxId: election, roleName: role, status: status };

    fetch("http://localhost:8080/roles/addroles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding(!isAdding);
      toast.success("🦄 New Role Added!");
      setElection("");
      setRole("");
    });
  };

  //to get all the roles to display
  useEffect(() => {
    fetch("http://localhost:8080/roles/getall")
      .then((res) => res.json())
      .then((result) => {
        setRoleList(result);
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  }, [isAdding]);
  //fetch all elections created to display option for select
  useEffect(() => {
    fetch("http://localhost:8080/election/getall")
      .then((res) => res.json())
      .then((result) => {
        setList(result);
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  }, []);

  return (
    <div className="app-container content-around">
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
          <option value="">Select Election</option>
          {electionList.map((election, index) => (
            <option key={index} value={election.electionId}>
              {election.electionName}
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
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Candidate Role"
            required
          />
        </div>

        <button
          type="submit"
          onClick={saverole}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
      <div className="mx-8 my-12">
        <RoleList RoleList={roleList} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
}

export default Roles;
