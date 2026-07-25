import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentTable.css";

function AppointmentTable() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const getAppointments = async () => {

      try {

        const id = localStorage.getItem("patientId");

        const res = await axios.get(
          `http://localhost:5000/api/appointments/patient/${id}`
        );

        setAppointments(res.data.appointments);

      } catch (error) {
        console.log(error);
      }

    };

    getAppointments();

  }, []);

  return (

    <div className="appointment-card">

      <div className="appointment-header">

        <h3>
          My Appointments
        </h3>

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

          {
            appointments.length > 0 ? (

              appointments.map((item) => (

                <tr key={item._id}>

                  <td>
                    Dr. {item.doctorId?.name}
                  </td>

                  <td>
                    {item.day}, {item.date}
                  </td>

                  <td>
                    {item.time}
                  </td>

                  <td>

                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="no-data"
                >
                  No Appointments Found
                </td>

              </tr>

            )
          }

        </tbody>

      </table>

    </div>

  );

}

export default AppointmentTable;