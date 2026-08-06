
import React, { useState, useEffect } from "react";
import "./AppointmentTable.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../Socket/socket";
function AppointmentTable() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  // DEFAULT = TODAY
  const [sortType, setSortType] = useState("today");

  const doctorId = localStorage.getItem("doctorId");

  // =========================
  // FETCH APPOINTMENTS
  // =========================
 const fetchAppointments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/appointments/doctor/${doctorId}`
    );

    if (Array.isArray(response.data)) {
      setAppointments(response.data);
    } else if (Array.isArray(response.data?.appointments)) {
      setAppointments(response.data.appointments);
    } else {
      setAppointments([]);
    }
  } catch (error) {
    console.log(error);
    setAppointments([]);
  }
};

useEffect(() => {
  if (doctorId) {
    fetchAppointments();
  }
}, [doctorId]);

useEffect(() => {
  socket.on("appointment-status-updated", (updatedAppointment) => {

    setAppointments((prev) =>
      prev.map((item) =>
        item._id === updatedAppointment._id
          ? updatedAppointment
          : item
      )
    );

  });

  return () => {
    socket.off("appointment-status-updated");
  };
}, []);

  // =========================
  // MAKE SURE ARRAY
  // =========================
  const appointmentList = Array.isArray(
    appointments
  )
    ? appointments
    : [];

  // =========================
  // GET TODAY DATE
  // FORMAT: DD-MM-YYYY
  // =========================
  const getTodayDateString = () => {
    const today = new Date();

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // =========================
  // PARSE DATE + TIME
  // =========================
  const parseAppointmentDateTime = (
    appointment
  ) => {
    if (!appointment?.date) {
      return 0;
    }

    let dateString = String(
      appointment.date
    ).trim();

    // 31/07/2026 -> 31-07-2026
    dateString = dateString.replace(
      /\//g,
      "-"
    );

    const parts = dateString.split("-");

    if (parts.length !== 3) {
      console.log(
        "Invalid appointment date:",
        appointment.date
      );

      return 0;
    }

    let day = Number(parts[0]);
    let month = Number(parts[1]);
    let year = Number(parts[2]);

    if (!day || !month || !year) {
      return 0;
    }

    // 26 -> 2026
    if (year < 100) {
      year += 2000;
    }

    const date = new Date(
      year,
      month - 1,
      day
    );

    // =========================
    // PARSE TIME
    // =========================
    if (appointment.time) {
      const timeString = String(
        appointment.time
      )
        .trim()
        .toUpperCase();

      /*
        Supports:

        10:00 AM
        10:00AM
        12:00 PM
        11:20AM
        02:30 PM
      */

      const match = timeString.match(
        /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
      );

      if (match) {
        let hours = Number(
          match[1]
        );

        const minutes = Number(
          match[2]
        );

        const period = match[3];

        // 12 AM = 00
        if (
          period === "AM" &&
          hours === 12
        ) {
          hours = 0;
        }

        // PM
        if (
          period === "PM" &&
          hours !== 12
        ) {
          hours += 12;
        }

        date.setHours(
          hours,
          minutes,
          0,
          0
        );
      }
    }

    return date.getTime();
  };

  // =========================
  // SORT / FILTER APPOINTMENTS
  // =========================
  const sortedAppointments =
    [...appointmentList].sort(
      (a, b) => {
        const dateA =
          parseAppointmentDateTime(a);

        const dateB =
          parseAppointmentDateTime(b);

        // =========================
        // TODAY
        // =========================
        if (sortType === "today") {
          const today =
            getTodayDateString();

          const aIsToday =
            a.date === today;

          const bIsToday =
            b.date === today;

          // Today appointments first
          if (
            aIsToday &&
            !bIsToday
          ) {
            return -1;
          }

          if (
            !aIsToday &&
            bIsToday
          ) {
            return 1;
          }

          // Today's appointments
          // earliest time first
          if (
            aIsToday &&
            bIsToday
          ) {
            return dateA - dateB;
          }

          return 0;
        }

        // =========================
        // LATEST
        // =========================
        if (
          sortType === "latest"
        ) {
          return dateB - dateA;
        }

        // =========================
        // OLDEST
        // =========================
        if (
          sortType === "oldest"
        ) {
          return dateA - dateB;
        }

        // =========================
        // A-Z
        // =========================
        if (sortType === "az") {
          const nameA =
            a.patientId?.name || "";

          const nameB =
            b.patientId?.name || "";

          return nameA.localeCompare(
            nameB
          );
        }

        // =========================
        // Z-A
        // =========================
        if (sortType === "za") {
          const nameA =
            a.patientId?.name || "";

          const nameB =
            b.patientId?.name || "";

          return nameB.localeCompare(
            nameA
          );
        }

        return 0;
      }
    );

  // =========================
  // DEBUG
  // =========================
  console.log(
    "TODAY:",
    getTodayDateString()
  );

  console.log(
    "SORT TYPE:",
    sortType
  );

  console.log(
    "SORTED APPOINTMENTS:",
    sortedAppointments.map(
      (item) => ({
        name: item.patientId?.name,
        date: item.date,
        time: item.time,
        parsed:
          parseAppointmentDateTime(
            item
          )
      })
    )
  );

  // =========================
  // UI
  // =========================
  return (
    <>
    <div className="appointment-card">

      {/* ================= HEADER ================= */}
      <div className="appointment-header">

        <div>
          <h2>
            Today's Appointments
          </h2>

          <p>
            {sortType === "today"
              ? sortedAppointments.length
              : appointmentList.length}{" "}
            Appointments Scheduled
          </p>
        </div>

        {/* ================= SORT ================= */}
        <div className="sort-box">

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(
                e.target.value
              )
            }
          >

            {/* DEFAULT */}
            <option value="today">
              Today
            </option>

            <option value="latest">
              Latest Appointment
            </option>

            <option value="oldest">
              Oldest Appointment
            </option>

            <option value="az">
              Patient Name A-Z
            </option>

            <option value="za">
              Patient Name Z-A
            </option>

          </select>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="table-responsive">

        <table className="appointment-table">

          <thead>

            <tr>

              <th>
                Patient Name
              </th>

              <th>
                Age
              </th>

              <th>
                Appointment Date
              </th>

              <th>
                Appointment Time
              </th>

              <th>
                Status
              </th>

              <th>
                Details
              </th>

            </tr>

          </thead>

          <tbody>

            {sortedAppointments.length ===
            0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="no-data"
                >
                  {sortType ===
                  "today"
                    ? "No Appointments Today"
                    : "No Appointments Found"}
                </td>

              </tr>

            ) : (

              sortedAppointments.map(
                (item) => (

                  <tr
                    key={item._id}
                  >

                    {/* ================= PATIENT ================= */}
                    <td>

                      <div className="patient-info">

                        <div className="patient-avatar">

                          {item.patientId?.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "P"}

                        </div>

                        <div>

                          <h5>
                            {item.patientId
                              ?.name ||
                              "Unknown"}
                          </h5>

                          <span>
                            Patient
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* ================= AGE ================= */}
                    <td>
                      {item.patientId
                        ?.age || "-"}
                    </td>

                    {/* ================= DATE ================= */}
                    <td>
                      {item.date || "-"}
                    </td>

                    {/* ================= TIME ================= */}
                    <td>
                      {item.time || "-"}
                    </td>

                    {/* ================= STATUS ================= */}
                    <td>

                      <span
                        className={`status ${
                          item.status
                            ?.toLowerCase() ||
                          ""
                        }`}
                      >
                        {item.status ||
                          "Pending"}
                      </span>

                    </td>

                    {/* ================= DETAILS ================= */}
                    <td>

                      <button
                        className="view-btn"
                        onClick={() => {

                          localStorage.setItem(
                            "appointmentId",
                            item._id
                          );

                          navigate(
                            `/prescription/${item._id}`,
                            {
                              state: {
                                appointment:
                                  item
                              }
                            }
                          );

                        }}
                      >
                        View ALL Details
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
    </>
  );
}

export default AppointmentTable;

