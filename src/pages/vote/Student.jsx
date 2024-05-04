import React, { useState, useEffect } from "react";
import RoleList from "../../component/list/RoleList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "../../component/list/UserList";

function Student() {
  const [election, setElection] = useState("");
  const [username, setUsername] = useState("");
  const [isVoted, setisVoted] = useState("No");
  const [users, setuserList] = useState([]);
  const [electionList, setList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const status = 1;

  const saveUser = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!election || !username) {
      // Display an error message or handle the empty fields
      // For example:
      toast.error("Please fill in all the required fields.");
      return; // Exit the function if any field is empty
    }

    // All validations passed, proceed with saving the role
    const data = {
      evoxId: election,
      userName: username,
      isVoted: isVoted,
      status: status,
    };

    fetch("http://localhost:8080/users/addusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding(!isAdding);
      toast.success("🦄 New User Added!");
    });
  };

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
  }, [isAdding]);

  useEffect(() => {
    fetch("http://localhost:8080/users/getall")
      .then((res) => res.json())
      .then((result) => {
        setuserList(result);
      })
      .catch((error) => {
        console.error("Error fetching election list:", error);
      });
  }, [isAdding]);

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
            Username
          </label>
          <input
            type="text"
            id="role"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>

        <button
          type="submit"
          onClick={saveUser}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
      <div className="mx-8 my-12">
        <UserList setIsAdding={setIsAdding} usersList={users} />
      </div>
    </div>
  );
}

export default Student;
