import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../MyAppointments/MyAppointments.css"


function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  const patientId = localStorage.getItem("patientId");

  const fetchAppointments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/appointments/patient/${patientId}`
    );

    setAppointments(response.data.appointments);
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

    alert("Appointment Cancelled");

    // List refresh
    fetchAppointments();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">My Appointments</h2>

        {appointments.length === 0 ? (
          <h4>No Appointment Found</h4>
        ) : (
          appointments.map((item) => (

            <div
              key={item._id}
              className="card mb-4 shadow-sm"
            >
              <div className="card-body">

                <h3>{item.doctorId.name}</h3>

                <p>
                  <strong>Qualification : </strong>
                  {item.doctorId.qualification}
                </p>

                <p>
                  <strong>Experience : </strong>
                  {item.doctorId.experience} Years
                </p>

                <p>
                  <strong>Hospital : </strong>
                  {item.doctorId.hospital}
                </p>

                <p>
                  <strong>Fee : </strong>
                  ₹{item.doctorId.consultationFee}
                </p>

                <p>
                  <strong>Appointment Date : </strong>
                  {item.day}, {item.date}
                </p>

                

                <p>
                  <strong>Appointment Time : </strong>
                  {item.time}
                </p>


<div className="cancel-btn-container">
    <button     onClick={() => cancelAppointment(item._id)}
className="cancel-btn">
      Cancel Appointment
    </button>
  </div>
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