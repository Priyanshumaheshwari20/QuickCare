import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AppointmentTable.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import socket from "../../Socket/socket";
function AppointmentTable() {
  
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/doctor/${doctorId}`
        );

        setAppointments(response.data.appointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

useEffect(() => {
  socket.on("call-accepted", async ({ appointmentId }) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/status/${appointmentId}`,
        {
          status: "In Progress",
        }
      );

      navigate(`/video/${appointmentId}`);
    } catch (error) {
      console.log(error);
    }
  });

  return () => {
    socket.off("call-accepted");
  };
}, [navigate]);
  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div>
          <h2>Today's Appointments</h2>
          <p>{appointments.length} Appointments Scheduled</p>
        </div>

        
      </div>

      <div className="table-responsive">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
                  <th>View Prescription</th>

            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {item.patientId?.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h5>
                          {item.patientId
                            ? item.patientId.name
                            : "Unknown"}
                        </h5>

                        <span>Patient</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.patientId?.age || "-"}</td>

                  <td>{item.time}</td>

                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
             <button
  className="view-btn"
  onClick={async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/status/${item._id}`,
        {
          status: "Waiting",
        }
      );

      socket.emit("call-patient", {
        doctorId,
        patientId: item.patientId._id,
        appointmentId: item._id,
      });

      navigate(`/calling/${item._id}`);
    } catch (error) {
      console.log(error);
    }
  }}
>
  Video Call
  <FaArrowRight />
</button>
                  </td>

<td>
  <button
    className="view-btn"
    onClick={() => {

       console.log("Appointment:", item);
      console.log("Appointment ID:", item._id);

      if (!item._id) {
        alert("Appointment ID not found");
        return;
      }
      localStorage.setItem("appointmentId", item._id);
navigate(`/prescription/${item._id}`, {
  state: { appointment: item },
});
    }}
  >
    View All
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentTable;