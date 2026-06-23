"use client";

import { useState } from "react";


import Dashboard from "../components/Dashboard";

import Courses from "../components/Courses";
import LiveClasses from "../components/LiveClasses";
import Batches from "../components/Batches";

import Certificates from "../components/Certificates";
import Settings from "../components/Settings";
import useMe from "@/Hooks/useMe";
import useAuthStore from "@/store/authStore";
import StudentLoading from "../components/StudentLoading";
import Profile from "../components/Profile";



export default  function StudentPortala({section}) {
  
 
    const user = useAuthStore((state)=>state.user)
    const profile = useAuthStore((state)=>state.profile)

  const {isLoading}=useMe()
  if(isLoading){
    return <StudentLoading></StudentLoading>
  }
  return (
    <div className="pt-24 ">

      {/* <StudentNavbar section={section}  /> */}

   
       {section=== "dashboard" && <Dashboard user={user} />}
        {section=== "profile" && <Profile user={user} profile={profile} />}
        {section=== "courses" && <Courses />}
        {section=== "classes" && <LiveClasses />}
         {section=== "batches" && <Batches />}

     
              {section=== "certificates" && <Certificates />}

        {section=== "settings" && <Settings />} 

        

      

        

        

       

  

      </div>

   
  );
}