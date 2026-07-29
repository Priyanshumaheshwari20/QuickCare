import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarCheck,
  FaUsers,
  FaFilePrescription,
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";
import "./StatsCards.css";

function StatsCards() {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");

        const appointmentResponse = await axios.get(
          `http://localhost:5000/api/appointments/count/${doctorId}`
        );

        const patientResponse = await axios.get(
          `http://localhost:5000/api/appointments/patients/count/${doctorId}`
        );

        setTotalAppointments(
          appointmentResponse.data.totalAppointments
        );

        setTotalPatients(
          patientResponse.data.totalPatients
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="stats-container">

      {/* Total Appointments */}
      <div className="stats-card">

        <div className="stats-top">

          <div className="icon blue">
            <FaCalendarCheck />
          </div>

          <div>
            <h5>Total Appointments</h5>
            <h2>{totalAppointments}</h2>
          </div>

        </div>

        <a href="/">
          View all appointments <FaArrowRight />
        </a>

      </div>

      {/* Total Patients */}
      <div className="stats-card">

        <div className="stats-top">

          <div className="icon green">
            <FaUsers />
          </div>

          <div>
            <h5>Total Patients</h5>
            <h2>{totalPatients}</h2>
          </div>

        </div>

        <a href="/">
          View all patients <FaArrowRight />
        </a>

      </div>


      {/* Earnings */}
      <div className="stats-card">

        <div className="stats-top">

          <div className="icon orange">
            <FaWallet />
          </div>

          <div>
            <h5>Earnings (This Month)</h5>
            <h2>₹0</h2>
          </div>

        </div>

        <a href="/">
          View earnings <FaArrowRight />
        </a>

      </div>

    </div>
  );
}

export default StatsCards;