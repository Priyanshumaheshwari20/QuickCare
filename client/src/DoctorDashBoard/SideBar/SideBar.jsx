import React from "react";
import { Link, useLocation } from "react-router-dom";

import {  FaTachometerAlt,  FaCalendarCheck,  FaUserInjured,  FaFileMedical,  FaHistory,  FaUserMd,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate} from "react-router-dom";

import "./SideBar.css";

function Sidebar() {
  const location = useLocation();
const navigate = useNavigate()
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/DoctorDashboard",
    },
    
    {
      name: "Patients",
      icon: <FaUserInjured />,
      path: "/Patients",
    },
   {
  name: "Prescription",
  icon: <FaFileMedical />,
  path: `/prescription/${localStorage.getItem("appointmentId") || ""}`,
},
    {
      name: "History",
      icon: <FaHistory />,
      path: "/ConsultationHistory",
    },
    {
      name: "Profile",
      icon: <FaUserMd />,
      path: "/DoctorProfile",
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h2>🩺 QuickCare</h2>
        <p>Doctor Panel</p>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">

        {menuItems.map((item) => (
          <li
            key={item.name}
            className={
              location.pathname === item.path
                ? "active"
                : ""
            }
          >
            <Link to={item.path}>
              <span>{item.icon}</span>

              <span>{item.name}</span>
            </Link>
          </li>
        ))}

      </ul>

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;