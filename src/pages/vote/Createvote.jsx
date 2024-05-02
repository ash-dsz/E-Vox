import React, { useState, useEffect } from "react";
import ElectionList from "../../component/list/ElectionList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Createvote() {
  const [electionTitle, setTitle] = useState("");
  const [electionDate, setDate] = useState("");
  const [electionDesc, setDesc] = useState("");
  const [electionList, setList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const status = 1;

  const SaveElection = (e) => {
    e.preventDefault();
    // Check if any of the required fields are empty
    if (!electionTitle || !electionDate) {
      // Display an error message or handle the empty fields
      toast.error("Please fill in all the required fields.");
      return; // Exit the function if any field is empty
    }

    // Check if the election date is older than today
    const today = new Date();
    const selectedDate = new Date(electionDate);
    if (selectedDate < today) {
      // Display an error message or handle the invalid date
      toast.error("Please select a date that is not in the past.");
      return; // Exit the function if the date is older than today
    }

    const data = {
      electionName: electionTitle,
      electionDescription: electionDesc,
      electionDate: electionDate,
      status: status,
    };
    fetch("http://localhost:8080/election/addelection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setIsAdding(!isAdding);
      toast.success("🦄 New Election Added!");
      setTitle("");
      setDate("");
      setDesc("");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/election/getall")
      .then((res) => res.json())
      .then((result) => {
        setList(result);
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
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Election Title
          </label>
          <input
            type="text"
            id="titel"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Election Title"
            value={electionTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Election Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Election Title"
            value={electionDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Election Description
          </label>
          <textarea
            id="message"
            rows="4"
            value={electionDesc}
            onChange={(e) => setDesc(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type Here"
          ></textarea>
        </div>

        <button
          type="button"
          onClick={SaveElection}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
      <div className="mx-8 my-12">
        <ElectionList electionList={electionList} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
}

export default Createvote;
