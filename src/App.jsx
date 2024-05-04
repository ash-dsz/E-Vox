import React, { useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/common/About";
import Settings from "./pages/common/Settings";
import Createvote from "./pages/vote/Createvote";
import Roles from "./pages/vote/Roles";
import Candidate from "./pages/vote/Candidate";
import Student from "./pages/vote/Student";
import Display from "./pages/common/Display";
import Sidebar from "./component/Sidebar";
import Login from "./Auth/Login";
import ElectionUpdate from "./pages/vote/update/ElectionUpdate";
import RoleUpdate from "./pages/vote/update/RoleUpdate";
import MyCandidates from "./pages/vote/MyCandidates";
const App = () => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.complete();
  }, [useLocation()]);
  return (
    <div>
      <LoadingBar color="#f11946" ref={ref} />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evox" element={<Createvote />} />
            <Route path="/evox/update/:id" element={<ElectionUpdate />} />
            <Route path="/addroles" element={<Roles />} />
            <Route path="/addroles/update/:id" element={<RoleUpdate />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/student" element={<Student />} />
            <Route path="/mycandidates" element={<MyCandidates />} />
            <Route path="/display" element={<Display />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
