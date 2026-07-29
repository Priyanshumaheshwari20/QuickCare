import React ,{useEffect}from "react";
import Sidebar from "../DoctorDashBoard/SideBar/SideBar"
import Header from "./Header/Header";
import StatsCards from "./StatsCards/StatsCards";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import CalendarCard from "./CalendarCard/CalendarCard";
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
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Header */}
        <Header />

    

        {/* Statistics */}
        <StatsCards />

        {/* Bottom Section */}
        <div className="dashboard-grid">

          {/* Left */}
          <div className="left-section">
            <AppointmentTable />
          </div>

          {/* Right */}
          <div className="right-section">
            <CalendarCard />
      
          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;