import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const doctorName = localStorage.getItem("doctorName");
  const doctorId = localStorage.getItem("doctorId");

  const [availability, setAvailability] = useState(false);

  // Greeting
  const hour = new Date().getHours();

  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  // Date
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}`
        );

        setAvailability(res.data.doctor.availability);
      } catch (err) {
        console.log(err);
      }
    };

    getDoctor();
  }, [doctorId]);

  const handleAvailability = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/doctors/availability/${doctorId}`
      );

      setAvailability(res.data.availability);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-header">

      {/* Left */}

      <div className="header-left">

        <span className="greeting">{greeting}</span>

        <h1>
          Welcome Back,
           👋
        </h1>
<h3 style={{color:"blue"}}>
  <span>  {doctorName}</span>
</h3>
        <p>
          Manage your appointments, patients and prescriptions from one place.
        </p>

        <div className="header-date">
          <FaCalendarAlt />
          {today}
        </div>

      </div>

      {/* Right */}

      <div className="header-right">

        <div className="availability-card">

          <div>

            <h5>Availability</h5>

            <div className="status">

              <span
                className={`status-dot ${
                  availability ? "online" : "offline"
                }`}
              ></span>

              <span className="status-text">
                {availability ? "Available" : "Offline"}
              </span>

            </div>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={availability}
              onChange={handleAvailability}
            />

            <span className="slider"></span>

          </label>

        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/login")}
        >
          <FaArrowLeft />
          Back to  login
        </button>

      </div>

    </div>
  );
}

export default Header;