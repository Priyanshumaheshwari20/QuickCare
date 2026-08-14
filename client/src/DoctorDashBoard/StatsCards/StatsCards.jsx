
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  FaCalendarCheck,
  FaUsers,
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";
import "./StatsCards.css";

function StatsCards() {
  const navigate = useNavigate();
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");

        if (!doctorId) {
          console.log("Doctor ID not found");
          return;
        }

        // Get all doctor appointments
        const response = await axios.get(
          `https://quickcare-3.onrender.com/api/appointments/doctor/${doctorId}`
        );

        console.log("Stats appointments:", response.data);

        // Backend direct array bhej raha hai
        const appointments = Array.isArray(response.data)
          ? response.data
          : response.data?.appointments || [];

        // Cancelled appointments ko count nahi karna
        const activeAppointments = appointments.filter(
          (appointment) => appointment.status !== "Cancelled"
        );

        // Total appointment/slots
        setTotalAppointments(activeAppointments.length);

        // Unique patients
        const uniquePatients = new Set(
          activeAppointments
            .map((appointment) => appointment.patientId?._id)
            .filter(Boolean)
        );

        setTotalPatients(uniquePatients.size);

      } catch (error) {
        console.log("Stats Count Error:", error);

        setTotalAppointments(0);
        setTotalPatients(0);
      }
    };

    fetchStats();
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

       <button
  type="button"
  onClick={() => {
    console.log("CLICKED");
    navigate("/doctor/view-all-appointments");
  }}
  className="stats-link"
>
  View all appointments <FaArrowRight />
</button>

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

