
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
     "7:30 PM", "9:00 PM"
  ];

  const [doctor, setDoctor] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const patientId = localStorage.getItem("patientId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const nextDays = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "short"
      });

      const date = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const formattedDay = String(date).padStart(2, "0");
      const formattedMonth = String(month).padStart(2, "0");
      const fullDate = `${formattedDay}-${formattedMonth}-${year}`;

      nextDays.push({
        day: dayName,
        date,
        month,
        year,
        fullDate
      });
    }

    console.log("NEXT 7 DAYS:", nextDays);
    setDays(nextDays);
  }, []);

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const response = await axios.get(
          "https://quickcare-3.onrender.com/api/doctors"
        );

        const selectedDoctor = response.data.doctors.find(
          (item) => item._id === id
        );

        setDoctor(selectedDoctor);
      } catch (error) {
        console.log("DOCTOR FETCH ERROR:", error);
      }
    };

    getDoctorDetails();
  }, [id]);

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

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

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

    if (!isToday) return timeSlots;

    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();

    return timeSlots.filter((slot) => {
      const [time, modifier] = slot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const slotMinutes = hours * 60 + minutes;
      return slotMinutes > currentMinutes;
    });
  };

  const handleAppointment = async () => {
    if (!patientId || role !== "patient") {
      toast.warning(
        "To book an appointment, please login or create a Patient account.",
        { position: "top-right", autoClose: 3000 }
      );
      return;
    }

    if (!selectedDay) {
      toast.warning("📅 Please select Date", {
        position: "top-right",
        autoClose: 2500
      });
      return;
    }

    if (!selectedTime) {
      toast.warning("🕒 Please select Time", {
        position: "top-right",
        autoClose: 2500
      });
      return;
    }

    try {
      const fullDate = selectedDay.fullDate;

      const bookingData = {
        patientId,
        doctorId: doctor._id,
        day: selectedDay.day,
        date: fullDate,
        time: selectedTime
      };

      console.log("BOOKING DATA:", bookingData);

      const response = await axios.post(
        "https://quickcare-3.onrender.com/api/appointments",
        bookingData
      );

      console.log("BOOKING SUCCESS:", response.data);

      toast.success("✅ Appointment Booked Successfully", {
        position: "top-right",
        autoClose: 2500
      });

      setTimeout(() => {
        navigate("/myappointments");
      }, 500);
    } catch (error) {
      console.log("BOOKING ERROR:", error);

      if (error.response?.status === 409) {
        toast.error(
          `❌ ${selectedTime} is already booked. Please choose another slot.`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
          }
        );
        return;
      }

      if (error.response?.status === 400) {
        console.log("400 RESPONSE:", error.response.data);

        toast.error(
          error.response?.data?.message ||
            "Invalid appointment details.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
          }
        );
        return;
      }

      toast.error(
        error.response?.data?.message || "Booking Failed",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        }
      );
    }
  };

  if (!doctor) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="container doctor-details-section">
        <div className="doctor-container">

          <div className="col-md-2">
            <div className="image-box">
              <h4>Doctor Image</h4>
            </div>
          </div>

          <div className="col-md-8">
            <div className="details-box">
              <h1>{doctor.name}</h1>

              <div className="doctor-info">
                <p>{doctor.qualification}</p>
                <span>{doctor.experience} Years</span>
              </div>

              <h4>About</h4>
              <p>{doctor.about}</p>

              <h4>
                Appointment Fee:
                <span style={{ color: "blue", marginLeft: "5px" }}>
                  ₹{doctor.consultationFee}
                </span>
              </h4>
            </div>

            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Booking Slots
            </h4>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              {days.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (
                      selectedDay?.fullDate === item.fullDate
                    ) {
                      setSelectedDay(null);
                      setSelectedTime("");
                      return;
                    }

                    setSelectedDay(item);
                    setSelectedTime("");
                  }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    border:
                      selectedDay?.fullDate === item.fullDate
                        ? "2px solid #0d6efd"
                        : "2px solid black",
                    background:
                      selectedDay?.fullDate === item.fullDate
                        ? "#0d6efd"
                        : "#fff",
                    color:
                      selectedDay?.fullDate === item.fullDate
                        ? "#fff"
                        : "#000",
                    transition: "0.2s"
                  }}
                >
                  <span>{item.day}</span>
                  <h4 style={{ margin: 0 }}>{item.date}</h4>
                </div>
              ))}
            </div>

            {selectedDay && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "8px 14px",
                  background: "#f0f6ff",
                  borderRadius: "10px",
                  color: "#0d6efd",
                  fontWeight: "600",
                  display: "inline-block"
                }}
              >
                Selected Date: {selectedDay.fullDate}
              </div>
            )}

            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Available Time
            </h4>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              {getAvailableSlots().map((time, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (selectedTime === time) {
                      setSelectedTime("");
                    } else {
                      setSelectedTime(time);
                    }
                  }}
                  style={{
                    padding: "8px 14px",
                    border:
                      selectedTime === time
                        ? "2px solid #0d6efd"
                        : "2px solid #ccc",
                    background:
                      selectedTime === time
                        ? "#0d6efd"
                        : "#fff",
                    color:
                      selectedTime === time ? "#fff" : "#000",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "0.2s"
                  }}
                >
                  {time}
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary mt-3"
              onClick={handleAppointment}
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
