import React from "react";
import Sidebar from "../DoctorDashBoard/SideBar/SideBar"
import Header from "./Header/Header";
import StatsCards from "./StatsCards/StatsCards";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import CalendarCard from "./CalendarCard/CalendarCard";
import ActivityCard from "./ActivityCard/ActivityCard";

import "./DoctorDashboard.css";

function DoctorDashboard() {
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
            <ActivityCard />
          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;