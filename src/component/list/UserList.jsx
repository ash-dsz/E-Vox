import React, { useState, useEffect } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function UserList(props) {
  const { usersList, setIsAdding } = props;

  const [userId, setUserId] = useState("");
  const [election, setElection] = useState("");
  const [username, setUsername] = useState("");
  const [isVoted, setIsVoted] = useState("");
  const status = 0;

  useEffect(() => {
    const data = {
      evoxId: election,
      userName: username,
      isVoted: isVoted,
      status: status,
    };

    fetch(`http://localhost:8080/users/delete/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding((prevIsAdding) => !prevIsAdding); // Toggle isAdding state
    });
  }, [username, election, isVoted]);

  const deleteUser = (id) => {
    const selectedCandidate = usersList.find((user) => user.userId === id);
    setUserId(id);
    setIsVoted(selectedCandidate.isVoted);
    setElection(selectedCandidate.evoxId);
    setUsername(selectedCandidate.userName);
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Election
              </th>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.evoxId}
                </td>
                <td className="px-6 py-4">{user.userName}</td>
                <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#FF0000" }}
                >
                  {/* Add action buttons or links */}
                  <FontAwesomeIcon
                    onClick={() => {
                      deleteUser(user.userId);
                    }}
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

export default UserList;
