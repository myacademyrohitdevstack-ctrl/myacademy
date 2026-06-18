"use client";

import { useState } from "react";

import StudentNavbar from "./components/StudentNavbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Courses from "./components/Courses";
import LiveClasses from "./components/LiveClasses";
import Batches from "./components/Batches";
import Announcements from "./components/Announcment";
import Certificates from "./components/Certificates";
import Settings from "./components/Settings";



export default function StudentPortal() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="pt-24 mx-auto max-w-7xl">

      <StudentNavbar page={page} setPage={setPage} />

      <div className="max-w-7xl mx-auto px-5 py-10">
       {page === "dashboard" && <Dashboard />}
        {page === "profile" && <Profile />}
        {page === "courses" && <Courses />}
        {page === "classes" && <LiveClasses />}
         {page === "batches" && <Batches />}

        {page === "announcements" && <Announcements />}
              {page === "certificates" && <Certificates />}

        {page === "settings" && <Settings />} 

        

      

        

        

       

  

      </div>

    </div>
  );
}