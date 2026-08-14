
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import "./Header.css";

function Header() {
  const doctorName = localStorage.getItem("doctorName");
  const doctorId = localStorage.getItem("doctorId");

  const [availability, setAvailability] = useState(false);

  // =========================
  // GREETING
  // =========================
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

  // =========================
  // DATE
  // =========================
  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // =========================
  // GET DOCTOR
  // =========================
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(
          `https://quickcare-3.onrender.com/api/doctors/${doctorId}`
        );

        setAvailability(
          res.data.doctor.availability
        );
      } catch (err) {
        console.log(
          "Doctor fetch error:",
          err
        );
      }
    };

    if (doctorId) {
      getDoctor();
    }
  }, [doctorId]);

  // =========================
  // CHANGE AVAILABILITY
  // =========================
  const handleAvailability = async () => {
    try {
      const res = await axios.put(
        `https://quickcare-3.onrender.com/api/doctors/availability/${doctorId}`
      );

      setAvailability(
        res.data.availability
      );
    } catch (err) {
      console.log(
        "Availability update error:",
        err
      );
    }
  };

  return (
    <div className="dashboard-header">

      {/* ================= LEFT ================= */}

      <div className="header-left">

        <span className="greeting">
          {greeting}
        </span>

        <h1>
          Welcome Back, 👋
        </h1>

        <h3>
          {doctorName}
        </h3>

        <p>
          Manage your appointments, patients
          and prescriptions from one place.
        </p>

        <div className="header-date">
          <FaCalendarAlt />
          <span>{today}</span>
        </div>

      </div>


      {/* ================= RIGHT ================= */}

      <div className="header-right">

        {/* AVAILABILITY */}

        <div
          className={`availability-card ${
            availability
              ? "available-card"
              : "offline-card"
          }`}
        >

          <div className="availability-info">

            <h5>
              Availability
            </h5>

            <div className="availability-status">

              <span
                className={`status-dot ${
                  availability
                    ? "online"
                    : "offline"
                }`}
              ></span>

              <span
                className={`status-text ${
                  availability
                    ? "online-text"
                    : "offline-text"
                }`}
              >
                {availability
                  ? "Available"
                  : "Offline"}
              </span>

            </div>

          </div>


          {/* TOGGLE */}

          <label className="switch">

            <input
              type="checkbox"
              checked={availability}
              onChange={
                handleAvailability
              }
            />

            <span className="slider"></span>

          </label>

        </div>

      </div>

    </div>
  );
}

export default Header
