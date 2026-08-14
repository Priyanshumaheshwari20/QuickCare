import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./StatsCards.css";

function StatsCards() {
const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchData = async () => {

      try {

        const patientId = localStorage.getItem("patientId");

        const res = await axios.get(
          `https://quickcare-3.onrender.com/api/appointments/patient/${patientId}`
        );

        const appointments = res.data;

        setStats({
          total: appointments.length,
          pending: appointments.filter(a => a.status === "Pending").length,
          completed: appointments.filter(a => a.status === "Completed").length,
          cancelled: appointments.filter(a => a.status === "Cancelled").length,
        });

      } catch (err) {
        console.log(err);
      }

    };

    fetchData();

  }, []);

  return (

    <div className="stats-container">

      <div className="stats-card blue">

        <div className="stats-icon">
          <FaCalendarCheck />
        </div>

        <div  onClick = {() => navigate("/myappointments")}>
          <h2>{stats.total}</h2>
          <p>Total Appointments</p>
        </div>

      </div>

      <div className="stats-card orange">

        <div className="stats-icon">
          <FaClock />
        </div>

        <div>
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>

      </div>

      <div className="stats-card green">

        <div className="stats-icon">
          <FaCheckCircle />
        </div>

        <div>
          <h2>{stats.completed}</h2>
          <p>Completed</p>
        </div>

      </div>

      <div className="stats-card red">

        <div className="stats-icon">
          <FaTimesCircle />
        </div>

        <div>
          <h2>{stats.cancelled}</h2>
          <p>Cancelled</p>
        </div>

      </div>

    </div>

  );

}

export default StatsCards;