import React, { useState, useEffect } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function RoleList(props) {
  const { RoleList, setIsAdding } = props;

  const [election, setElection] = useState("");
  const [role, setRole] = useState("");
  const [RoleId, setId] = useState("");

  //will be called whenever the election and role data will change
  useEffect(() => {
    const data = { evoxId: election, roleName: role };

    fetch(`http://localhost:8080/roles/delete/${RoleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding((prevIsAdding) => !prevIsAdding); // Toggle isAdding state
    });
  }, [role, election]);

  //called to delete the role
  const deleteRole = (roleId) => {
    const SelectedRole = RoleList.find(
      (RoleList) => RoleList.roleId === roleId
    );
    setId(roleId); //update role id to remove the role
    setElection(SelectedRole.evoxId);
    setRole(SelectedRole.roleName);
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
                Role Name
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Edit
              </th> */}
              <th scope="col" className="px-6 py-3">
                Delete
              </th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {RoleList.map((role, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {role.evoxId}
                </td>
                <td className="px-6 py-4">{role.roleName}</td>
                {/* Add more table cells for additional data */}
                {/* <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#1858E6" }}
                >
                  {/* Add action buttons or links */}
                {/* <Link to={`update/${role.roleId}`}>
                    <FontAwesomeIcon className="fa-xl" icon={faPenToSquare} />
                  </Link>
                </td> */}
                <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#FF0000" }}
                >
                  {/* Add action buttons or links */}
                  <FontAwesomeIcon
                    onClick={() => {
                      deleteRole(role.roleId);
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

export default RoleList;
