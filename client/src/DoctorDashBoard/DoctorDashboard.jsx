import React, { useEffect } from "react";

import Header from "./Header/Header";
import StatsCards from "./StatsCards/StatsCards";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import DoctorLayout from "./DoctorLayout/DoctorLayout";

import socket from "../Socket/socket";

import "./DoctorDashboard.css";


function DoctorDashboard() {


  useEffect(() => {

    const doctorId = localStorage.getItem("doctorId");

    if (doctorId) {
      socket.emit("register", doctorId);
    }

  }, []);



  return (

    <DoctorLayout>


      <Header />


      <StatsCards />


      <div className="dashboard-grid">

        <div className="left-section">

          <AppointmentTable />

        </div>


      </div>


    </DoctorLayout>

  );

}


export default DoctorDashboard;