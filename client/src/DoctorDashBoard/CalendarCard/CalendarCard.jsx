import React from "react";
import {
  FaCalendarAlt,
  FaFilePrescription,
  FaUserInjured,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CalenderCard.css";


function CalendarCard() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "View Appointments",
      icon: <FaCalendarAlt />,
      color: "blue",
      path: "/doctor-appointments",
    },
    {
      title: "Write Prescription",
      icon: <FaFilePrescription />,
      color: "green",
      path: "/doctor-prescription",
    },
    {
      title: "Patient History",
      icon: <FaUserInjured />,
      color: "purple",
      path: "/patient-history",
    },
    {
      title: "Reports & Analytics",
      icon: <FaChartBar />,
      color: "orange",
      path: "/reports",
    },
  ];

  return (
    <div className="quick-actions-card">

      <h3>Quick Actions</h3>

      <div className="quick-grid">

        {actions.map((item, index) => (
          <div
            key={index}
            className={`quick-box ${item.color}`}
            onClick={() => navigate(item.path)}
          >
            <div className={`quick-icon ${item.color}`}>
              {item.icon}
            </div>

            <h4>{item.title}</h4>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CalendarCard;