
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./DoctorDetails.css";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // ALL TIME SLOTS
  // =====================================================

 const timeSlots = [
  "10:00 AM",
  "10:40 AM",
  "11:20 AM",
  "12:00 PM",
  "12:40 PM",
  "1:30 PM",
  "4:30 PM",
  "5:20 PM",
  "6:10 PM",
  "7:30 PM",
  "9:00 PM",
];

  const [doctor, setDoctor] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const patientId = localStorage.getItem("patientId");
  const role = localStorage.getItem("role");

  // =====================================================
  // GENERATE NEXT 7 DAYS
  // =====================================================

  useEffect(() => {
    const nextDays = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();

      currentDate.setDate(
        currentDate.getDate() + i
      );

      const dayName =
        currentDate.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        );

      const date =
        currentDate.getDate();

      const month =
        currentDate.getMonth() + 1;

      const year =
        currentDate.getFullYear();

      // DD
      const formattedDay =
        String(date).padStart(2, "0");

      // MM
      const formattedMonth =
        String(month).padStart(2, "0");

      // FULL DATE
      // Example: 31-07-2026
      const fullDate =
        `${formattedDay}-${formattedMonth}-${year}`;

      nextDays.push({
        day: dayName,
        date: date,
        month: month,
        year: year,
        fullDate: fullDate,
      });
    }

    console.log(
      "NEXT 7 DAYS:",
      nextDays
    );

    setDays(nextDays);
  }, []);

  // =====================================================
  // FETCH DOCTOR
  // =====================================================

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        const selectedDoctor =
          response.data.doctors.find(
            (item) => item._id === id
          );

        setDoctor(selectedDoctor);
      } catch (error) {
        console.log(
          "DOCTOR FETCH ERROR:",
          error
        );
      }
    };

    getDoctorDetails();
  }, [id]);

  // =====================================================
  // ALL SLOTS ALWAYS VISIBLE
  // =====================================================

const getAvailableSlots = () => {

  if (!selectedDay) {

  const today = new Date();

  const currentMinutes =
    today.getHours() * 60 + today.getMinutes();

  return timeSlots.filter((slot) => {

    let [time, modifier] = slot.split(" ");

    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = Number(minutes);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const slotMinutes = hours * 60 + minutes;

    return slotMinutes > currentMinutes;
  });
}

  const now = new Date();

  const [day, month, year] = selectedDay.fullDate.split("-");

  const selectedDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  const isToday =
    selectedDate.toDateString() === now.toDateString();

  // Agar future date hai to sab slots dikhao
  if (!isToday) {
    return timeSlots;
  }

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

  return timeSlots.filter((slot) => {

    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const slotMinutes = hours * 60 + minutes;

    return slotMinutes > currentMinutes;

  });

};
  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleAppointment = async () => {
    // -----------------------------------------
    // CHECK LOGIN
    // -----------------------------------------

    if (
      !patientId ||
      role !== "patient"
    ) {
      toast.warning(
        "To book an appointment, please login or create a Patient account.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      return;
    }

    // -----------------------------------------
    // CHECK DATE
    // -----------------------------------------

    if (!selectedDay) {
      toast.warning(
        "📅 Please select Date",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );

      return;
    }

    // -----------------------------------------
    // CHECK TIME
    // -----------------------------------------

    if (!selectedTime) {
      toast.warning(
        "🕒 Please select Time",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );

      return;
    }

    try {
      // =========================================
      // FULL DATE
      //
      // Example:
      // 31-07-2026
      // =========================================

      const fullDate =
        selectedDay.fullDate;

      // =========================================
      // BOOKING DATA
      // =========================================

      const bookingData = {
        patientId: patientId,

        doctorId: doctor._id,

        day: selectedDay.day,

        date: fullDate,

        time: selectedTime,
      };

      console.log(
        "BOOKING DATA:",
        bookingData
      );

      // =========================================
      // POST APPOINTMENT
      // =========================================

      const response =
        await axios.post(
          "http://localhost:5000/api/appointments",
          bookingData
        );

      console.log(
        "BOOKING SUCCESS:",
        response.data
      );

      // =========================================
      // SUCCESS TOAST
      // =========================================

      toast.success(
        "✅ Appointment Booked Successfully",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );

      // =========================================
      // GO TO MY APPOINTMENTS
      // =========================================

      setTimeout(() => {
        navigate("/myappointments");
      }, 500);

    } catch (error) {
      console.log(
        "BOOKING ERROR:",
        error
      );

      // =========================================
      // SLOT ALREADY BOOKED
      // =========================================

      if (
        error.response?.status === 409
      ) {
        toast.error(
          `❌ ${selectedTime} is already booked. Please choose another slot.`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );

        return;
      }

      // =========================================
      // BAD REQUEST
      // =========================================

      if (
        error.response?.status === 400
      ) {
        console.log(
          "400 RESPONSE:",
          error.response.data
        );

        toast.error(
          error.response?.data?.message ||
            "Invalid appointment details.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );

        return;
      }

      // =========================================
      // OTHER ERROR
      // =========================================

      toast.error(
        error.response?.data?.message ||
          "Booking Failed",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (!doctor) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      <div className="container doctor-details-section">

        <div className="doctor-container">

          {/* =================================================
              DOCTOR IMAGE
          ================================================= */}

          <div className="col-md-2">

            <div className="image-box">
              <h4>
                Doctor Image
              </h4>
            </div>

          </div>

          {/* =================================================
              DOCTOR DETAILS
          ================================================= */}

          <div className="col-md-8">

            <div className="details-box">

              <h1>
                {doctor.name}
              </h1>

              <div className="doctor-info">

                <p>
                  {doctor.qualification}
                </p>

                <span>
                  {doctor.experience} Years
                </span>

              </div>

              <h4>
                About
              </h4>

              <p>
                {doctor.about}
              </p>

              <h4>
                Appointment Fee :

                <span
                  style={{
                    color: "blue",
                    marginLeft: "5px",
                  }}
                >
                  ₹
                  {doctor.consultationFee}
                </span>
              </h4>

            </div>

            {/* =================================================
                BOOKING DAYS
            ================================================= */}

            <h4
              style={{
                marginTop: "30px",
                marginBottom: "20px",
              }}
            >
              Booking Slots
            </h4>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >

              {days.map(
                (item, index) => (

                  <div
                    key={index}

                    onClick={() => {

                      // Same date click
                      if (
                        selectedDay?.fullDate ===
                        item.fullDate
                      ) {
                        setSelectedDay(
                          null
                        );

                        setSelectedTime(
                          ""
                        );

                        return;
                      }

                      // New date
                      setSelectedDay(
                        item
                      );

                      // Reset time
                      setSelectedTime(
                        ""
                      );
                    }}

                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",

                      display: "flex",
                      flexDirection: "column",

                      justifyContent:
                        "center",

                      alignItems:
                        "center",

                      cursor: "pointer",

                      border:
                        selectedDay?.fullDate ===
                        item.fullDate
                          ? "2px solid #0d6efd"
                          : "2px solid black",

                      background:
                        selectedDay?.fullDate ===
                        item.fullDate
                          ? "#0d6efd"
                          : "#fff",

                      color:
                        selectedDay?.fullDate ===
                        item.fullDate
                          ? "#fff"
                          : "#000",

                      transition:
                        "0.2s",
                    }}
                  >

                    <span>
                      {item.day}
                    </span>

                    <h4
                      style={{
                        margin: 0,
                      }}
                    >
                      {item.date}
                    </h4>

                  </div>
                )
              )}

            </div>

            {/* =================================================
                SELECTED DATE DISPLAY
            ================================================= */}

            {selectedDay && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "12px 18px",
                  background: "#f0f6ff",
                  borderRadius: "10px",
                  color: "#0d6efd",
                  fontWeight: "600",
                  display: "inline-block",
                }}
              >
                Selected Date:{" "}
                {selectedDay.fullDate}
              </div>
            )}

            {/* =================================================
                AVAILABLE TIME
            ================================================= */}

            <h4
              style={{
                marginTop: "40px",
                marginBottom: "20px",
              }}
            >
              Available Time
            </h4>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >

              {getAvailableSlots().map(
                (time, index) => (

                  <div
                    key={index}

                    onClick={() => {

                      if (
                        selectedTime ===
                        time
                      ) {
                        setSelectedTime(
                          ""
                        );
                      } else {
                        setSelectedTime(
                          time
                        );
                      }
                    }}

                    style={{
                      padding:
                        "10px 18px",

                      border:
                        selectedTime ===
                        time
                          ? "2px solid #0d6efd"
                          : "2px solid #ccc",

                      background:
                        selectedTime ===
                        time
                          ? "#0d6efd"
                          : "#fff",

                      color:
                        selectedTime ===
                        time
                          ? "#fff"
                          : "#000",

                      borderRadius:
                        "30px",

                      cursor:
                        "pointer",

                      fontWeight:
                        "600",

                      transition:
                        "0.2s",
                    }}
                  >
                    {time}
                  </div>

                )
              )}

            </div>

            {/* =================================================
                BOOK BUTTON
            ================================================= */}

            <button
              className="btn btn-primary mt-4"
              onClick={
                handleAppointment
              }
            >
              Book Appointment
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default DoctorDetails;