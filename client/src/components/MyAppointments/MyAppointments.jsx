import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./MyAppointments.css";
import { toast } from "react-toastify";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const patientId = localStorage.getItem("patientId");

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointments/patient/${patientId}`
      );

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [patientId]);

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`
      );

      toast.warning("Appointment Cancelled");
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="myappointments-container">

        <h2 className="page-title">My Appointments</h2>

        {appointments.length === 0 ? (
          <h3 className="no-data">No Appointment Found</h3>
        ) : (
          appointments.map((item) => (
            <div className="appointment-card" key={item._id}>

              <h2 className="doctor-name">
                 {item.doctorId.name}
              </h2>

              <p><strong>Qualification :</strong> {item.doctorId.qualification}</p>

              <p><strong>Experience :</strong> {item.doctorId.experience} Years</p>

              <p><strong>Hospital :</strong> {item.doctorId.hospital}</p>

              <p><strong>Consultation Fee :</strong> ₹{item.doctorId.consultationFee}</p>

              <p><strong>Appointment Date :</strong> {item.day}, {item.date}</p>

              <div className="bottom-row">

                <p className="time">
                  <strong>Appointment Time :</strong> {item.time}
                </p>

                <button
                  className="cancel-btn"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <Footer />
    </>
  );
}

export default MyAppointments;