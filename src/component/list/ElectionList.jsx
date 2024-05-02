import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ElectionList(props) {
  const { electionList, setIsAdding } = props; // Receive setIsAdding as a prop
  const [electionId, setId] = useState("");
  const [electionTitle, setTitle] = useState("");
  const [electionDate, setDate] = useState("");
  const [electionDesc, setDesc] = useState("");

  useEffect(() => {
    const data = {
      electionName: electionTitle,
      electionDescription: electionDesc,
      electionDate: electionDate,
    };
    fetch(`http://localhost:8080/election/delete/${electionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding((prevIsAdding) => !prevIsAdding); // Toggle isAdding state
      toast.error("🦄 Election Removed!");
    });
  }, [electionTitle, electionDate, electionDesc]);

  const deleteElection = (electionId) => {
    const selectedElection = electionList.find(
      (election) => election.electionId === electionId
    );
    setId(electionId);
    setTitle(selectedElection.electionName);
    setDate(selectedElection.electionDate);
    setDesc(selectedElection.electionDescription);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Election Name
              </th>
              <th scope="col" className="px-6 py-3">
                Election Date
              </th>
              <th scope="col" className="px-6 py-3">
                Election Description
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {electionList.map((election, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {election.electionName}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {election.electionDate}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {election.electionDescription}
                </td>
                {/* Add more table cells for additional data */}
                <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#1858E6" }}
                >
                  {/* Add action buttons or links */}
                  <Link to={`update/${election.electionId}`}>
                    <FontAwesomeIcon className="fa-xl" icon={faPenToSquare} />
                  </Link>
                </td>
                <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#FF0000" }}
                >
                  {/* Add action buttons or links */}
                  <FontAwesomeIcon
                    onClick={() => deleteElection(election.electionId)} // Pass electionId to delete function
                    className="fa-xl"
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ElectionList;
