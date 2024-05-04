import React from "react";
import { Link } from "react-router-dom";
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

function Home() {
  return (
    <div className="mx-4 flex  min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <ShortcutBox
          title="Create Vote"
          link="/evox"
          icon={faSquarePollVertical}
          color="#1A56DB" // Color for the icon
        />
        <ShortcutBox
          title="Add Roles"
          link="/addroles"
          icon={faUsers}
          color="#1A56DB" // Color for the icon
        />
        <ShortcutBox
          title="Add Candidates"
          link="/candidate"
          icon={faUser}
          color="#1A56DB" // Color for the icon
        />
        <ShortcutBox
          title="Add Students"
          link="/student"
          icon={faPersonChalkboard}
          color="#1A56DB" // Color for the icon
        />
        <ShortcutBox
          title="View Candidates"
          link="/mycandidates"
          icon={faChartGantt}
          color="#1A56DB" // Color for the icon
        />
        <ShortcutBox
          title="View Result"
          link="/display"
          icon={faPieChart}
          color="#1A56DB" // Color for the icon
        />
      </div>
    </div>
  );
}

const ShortcutBox = ({ title, link, icon, color }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-100"
    >
      <FontAwesomeIcon icon={icon} className="text-xl mb-2" style={{ color }} />
      <span className="text-lg font-semibold">{title}</span>
    </Link>
  );
};

export default Home;
