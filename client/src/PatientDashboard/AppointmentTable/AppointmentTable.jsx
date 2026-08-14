import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AppointmentTable.css";

function AppointmentTable() {

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getAppointments = async () => {

      try {

        const id = localStorage.getItem("patientId");

        if (!id) {
          setAppointments([]);
          return;
        }

        const res = await axios.get(
          `https://quickcare-3.onrender.com/api/appointments/patient/${id}`
        );

        console.log("Patient appointments:", res.data);

        setAppointments(
          Array.isArray(res.data) ? res.data : []
        );

      } catch (error) {

        console.log("Get appointments error:", error);

        setAppointments([]);

      }

    };

    getAppointments();

  }, []);


  return (
    <div className="appointment-card">

      <div className="appointment-header">

        <h3>My Appointments</h3>

      </div>


      <table>

        <thead>

          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>

        </thead>


        <tbody>

          {appointments.length > 0 ? (

            appointments.map((item) => (

              <tr key={item._id}>

                <td>
                  {item.doctorId?.name || "Unknown Doctor"}
                </td>


                <td>
                  {item.day}, {item.date}
                </td>


                <td>
                  {item.time}
                </td>


                <td>

                  <span
                    className={`status ${
                      item.status?.toLowerCase() || ""
                    }`}
                  >
                    {item.status || "Pending"}
                  </span>

                </td>


                

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="5" className="no-data">
                No Appointments Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default AppointmentTable;