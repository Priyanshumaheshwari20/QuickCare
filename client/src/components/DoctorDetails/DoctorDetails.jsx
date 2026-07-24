import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./DoctorDetails.css";
import { useNavigate } from "react-router-dom";

function DoctorDetails() {
  const { id } = useParams();
const navigate =useNavigate()
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
  // Generate Next 7 Days
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

  // Appointment Validation
  const handleAppointment = async () => {


  if(!patientId || role !== "patient"){
 alert("⚠️ Only Patient can book appointment");
 return; }
if(!selectedDay){
  alert("📅 Please select Date");
 return;}


  if(!selectedTime){
alert("🕒 Please select Time");
return;
}
 try{
 await axios.post(  "http://localhost:5000/api/appointments",
      {
        patientId,
        doctorId: doctor._id,
        day: selectedDay.day,
        date: selectedDay.date,
        time: selectedTime
      }
    );
alert("✅ Appointment Booked Successfully");

navigate("/myappointments")
  }
  catch(error){

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

          {/* Left Side */}

          <div className="col-md-2">

            <div className="image-box">
              <h4>Doctor Image</h4>
            </div>

          </div>

          {/* Right Side */}

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
                <span  style={{color:"blue"}}> ₹{doctor.consultationFee}</span>
              </h4>

            </div>

            {/* Booking Slots */}

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
    setSelectedDay(null);   // reset
  } else {
    setSelectedDay(item);   // select
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
                    transition: "0.3s",
                  }}
                >
                  <span>{item.day}</span>

                  <h4 style={{ margin: 0 }}>{item.date}</h4>
                </div>
              ))}
            </div>

            {/* Time */}

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
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                onClick={() => {
  if (selectedTime === time) {
    setSelectedTime("");   // reset
  } else {
    setSelectedTime(time); // select
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
              ))}
            </div>

            {/* Button */}

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