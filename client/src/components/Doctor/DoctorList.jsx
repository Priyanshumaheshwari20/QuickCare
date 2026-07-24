import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../Doctor/DoctorList.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DoctorList() {
const navigate =useNavigate()
  const [fetchDoctorsItems, setFetchDoctorsItems] = useState([]);
  const [selectSpecialization, setSelectSpecialization] = useState("");

  const filteredDoctors = selectSpecialization
    ? fetchDoctorsItems.filter(
        (item) => item.specialization === selectSpecialization
      )
    : fetchDoctorsItems;

  useEffect(() => {

    const getDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        console.log(response.data);
        setFetchDoctorsItems(response.data.doctors);

      } catch (error) {
        console.log(error);
      }
    };

    getDoctors();

  }, []);

  return (
    <>
      <Navbar />

      <div className="doctor-page">

        {/* LEFT SIDEBAR */}
        <div className="doctor-sidebar">

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Cardiologist")}
          >
            Cardiologist ❤️
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Gynecologist")}
          >
            Gynecologist 👩
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Orthopedic Surgeon")}
          >
            Orthopedic Surgeon 🦴
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Pulmonologist")}
          >
            Pulmonologist 🫁
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Urologist")}
          >
            Urologist 🚻
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Ophthalmologist")}
          >
            Ophthalmologist 👁️
          </p>

          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("Hematologist")}
          >
            Hematologist 🩸
          </p>

          {/* Show All */}
          <p
            className="border p-2 doctor"
            onClick={() => setSelectSpecialization("")}
          >
            All Doctors
          </p>

        </div>

        {/* RIGHT CONTENT */}

        <div className="doctor-content">

          <h1>Discover experienced doctors for your needs.</h1>

          <div className="row g-4">

            {filteredDoctors.length === 0 ? (
              <p>No Doctors Found</p>
            ) : (
              filteredDoctors.map((item) => (
                <div className="col-lg-3 col-md-6" key={item._id}>

                  <div className="doctor-card">

                    <div className="doctor-image">👨‍⚕️</div>

                    <h4   onClick={() => navigate(`/DoctorDetails/${item._id}`)}>{item.name}</h4>

                    <p
                      style={{  fontWeight: "600", fontFamily: "cursive",
                        display: "inline-block",
                        borderRadius: "12px",
                        border: "1px solid gray",
                        padding: "5px",
                      }}
                    >
                      {item.specialization}
                    </p>

                    <p  style={{display:"flex"}} >
                      <strong>Fee :</strong>
                     
                      ₹{item.consultationFee}
                    </p>

                    <button className="btn btn-primary w-100"   onClick={() => navigate(`/DoctorDetails/${item._id}`)}>
                      Book Appointment
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default DoctorList;