import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../SideBar/SideBar";

import "./DoctorLayout.css";


function DoctorLayout({ children }) {


  const [open, setOpen] = useState(false);


  const location = useLocation();


  const isDashboard =
    location.pathname === "/DoctorDashboard";



  return (

    <div className="doctor-layout">


      <Sidebar
        open={open}
        setOpen={setOpen}
        isDashboard={isDashboard}
      />



      <div className="doctor-content">

        {children}

      </div>



    </div>

  );

}


export default DoctorLayout;