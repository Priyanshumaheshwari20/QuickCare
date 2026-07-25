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
    "12:30 PM",
    "1:40 PM",
    "4:30 PM",
    "6:00 PM",
    "7:30 PM",
    "9:00 PM",
  ];

  const [doctor, setDoctor] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const patientId = localStorage.getItem("patientId");
  const role = localStorage.getItem("role");

  // Next 7 Days
  useEffect(() => {
    const nextDays = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      nextDays.push({
        day: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: currentDate.getDate(),
      });
    }

    setDays(nextDays);
  }, []);

  // Fetch Doctor
  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        const selectedDoctor = response.data.doctors.find(
          (item) => item._id === id
        );

        setDoctor(selectedDoctor);
      } catch (error) {
        console.log(error);
      }
    };

    getDoctorDetails();
  }, [id]);

  // Available Slots
  const availableSlots = timeSlots.filter((time) => {
  const today = new Date();

  // Agar date select nahi ki hai to aaj ki date maan lo
  const selectedDate = selectedDay
    ? selectedDay.date
    : today.getDate();

  const isToday = selectedDate === today.getDate();

  if (!isToday) return true;

  const slotTime = new Date();

  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  slotTime.setHours(hours, minutes, 0, 0);

  return slotTime > today;
});

  // Book Appointment
  const handleAppointment = async () => {
    if (!patientId || role !== "patient") {
      toast.warning("To book an appointment, please login or create a Patient account.");
      return;
    }

    if (!selectedDay) {
      toast.warning("📅 Please select Date");
      return;
    }

    if (!selectedTime) {
      toast.warning("🕒 Please select Time");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        patientId,
        doctorId: doctor._id,
        day: selectedDay.day,
        date: selectedDay.date,
        time: selectedTime,
      });

      toast.success("✅ Appointment Booked Successfully");
      navigate("/myappointments");
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
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
                Appointment Fee :
                <span style={{ color: "blue" }}>
                  ₹{doctor.consultationFee}
                </span>
              </h4>
            </div>

            <h4 style={{ marginTop: "30px", marginBottom: "20px" }}>
              Booking Slots
            </h4>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {days.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (selectedDay?.date === item.date) {
                      setSelectedDay(null);
                    } else {
                      setSelectedDay(item);
                    }
                  }}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    border:
                      selectedDay?.date === item.date
                        ? "2px solid #0d6efd"
                        : "2px solid black",
                    background:
                      selectedDay?.date === item.date
                        ? "#0d6efd"
                        : "#fff",
                    color:
                      selectedDay?.date === item.date
                        ? "#fff"
                        : "#000",
                  }}
                >
                  <span>{item.day}</span>
                  <h4 style={{ margin: 0 }}>{item.date}</h4>
                </div>
              ))}
            </div>

            <h4 style={{ marginTop: "40px", marginBottom: "20px" }}>
              Available Time
            </h4>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              {availableSlots.length === 0 ? (
                <p style={{ color: "red", fontWeight: "600" }}>
                  No slots available for today.
                </p>
              ) : (
                availableSlots.map((time, index) => (
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
                      padding: "10px 18px",
                      border:
                        selectedTime === time
                          ? "2px solid #0d6efd"
                          : "2px solid #ccc",
                      background:
                        selectedTime === time
                          ? "#0d6efd"
                          : "#fff",
                      color:
                        selectedTime === time
                          ? "#fff"
                          : "#000",
                      borderRadius: "30px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {time}
                  </div>
                ))
              )}
            </div>

            <button
              className="btn btn-primary mt-4"
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