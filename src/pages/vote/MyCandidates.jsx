import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyCandidates() {
  const [election, setElection] = useState("");
  const [role, setRole] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [candidateImg, setCandidateImg] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateClass, setCandidateClass] = useState("");
  const [candidateList, setList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const status = 0;

  useEffect(() => {
    fetch("http://localhost:8080/candidate/getall")
      .then((res) => res.json())
      .then((result) => {
        setList(result);
      });
  }, [isAdding]);

  //delete the candidate
  useEffect(() => {
    console.log(candidateId);
    const data = {
      evoxId: election,
      roleId: role,
      candidateName: candidateName,
      candidateClass: candidateClass,
      candidateImg: candidateImg,
      status: status,
    };
    fetch(`http://localhost:8080/candidate/delete/${candidateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding((prevIsAdding) => !prevIsAdding); // Toggle isAdding state
      toast.error("🦄  Candidate Removed!");
    });
  }, [candidateImg]);

  const deleteCandidate = (Candidateid) => {
    const selectedCandidate = candidateList.find(
      (candidate) => candidate.candidateId === Candidateid
    );
    setCandidateId(selectedCandidate.candidateId);
    setElection(selectedCandidate.evoxId);
    setRole(selectedCandidate.roleId);
    setCandidateName(selectedCandidate.candidateName);
    setCandidateClass(selectedCandidate.candidateClass);
    setCandidateImg(selectedCandidate.candidateImage);
  };
  return (
    <div className="app-container content-around">
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
      <div className="relative overflow-`x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Election
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Candidate Name
              </th>
              <th scope="col" className="px-6 py-3">
                Candidate Class
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {candidateList.map((candidate, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {candidate.evoxId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-full w-full rounded-full"
                        src={`http://localhost:8080/images/${candidate.candidateImage}`}
                        alt="User"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {candidate.roleId}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {candidate.candidateName}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {candidate.candidateClass}
                </td>

                <td
                  className="px-6 py-4 font-medium cursor-pointer"
                  style={{ color: "#FF0000" }}
                >
                  {/* Add action buttons or links */}
                  <FontAwesomeIcon
                    onClick={() => deleteCandidate(candidate.candidateId)} // Pass electionId to delete function
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

export default MyCandidates;
