import {
  faChartGantt,
  faDashboard,
  faGear,
  faMedal,
  faPersonChalkboard,
  faPieChart,
  faSquarePollVertical,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="w-64 shadow-xl h-screen pt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto w-full bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faPieChart} />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-2 space-x-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <FontAwesomeIcon icon={faSquarePollVertical} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Vote Area
              </span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul id="dropdown-example" className="hidden py-2 space-y-2">
              <li>
                <Link
                  to="/evox"
                  className="flex space-x-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faChartGantt} />
                  <span>PollCraft</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/addroles"
                  className="flex space-x-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faPersonChalkboard} />
                  <span>Roles</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/candidate"
                  className="flex space-x-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Candidate</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student"
                  className="flex space-x-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Student</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/display"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faMedal} />
              <span className="flex-1 ms-3 whitespace-nowrap">Display</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
