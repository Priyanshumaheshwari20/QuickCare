import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../Doctor/DoctorList.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function DoctorList() {
const navigate =useNavigate()
const location = useLocation();
const [sortBy, setSortBy] = useState("default");

const [favourites, setFavourites] = useState(
  JSON.parse(localStorage.getItem("favouriteDoctors")) || []
);

const [selectSpecialization, setSelectSpecialization] = useState(
  location.state?.speciality || ""
);
  const [fetchDoctorsItems, setFetchDoctorsItems] = useState([]);

  const filteredDoctors = selectSpecialization
    ? fetchDoctorsItems.filter(
        (item) => item.specialization === selectSpecialization
      )
    : fetchDoctorsItems;


    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
  switch (sortBy) {
    case "name":
      return a.name.localeCompare(b.name);

    case "feeLow":
      return a.consultationFee - b.consultationFee;

    case "feeHigh":
      return b.consultationFee - a.consultationFee;

    case "experience":
      return b.experience - a.experience;

    default:
      return 0;
  }
});

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

const toggleFavourite = (doctor) => {
  let updated;

  const exists = favourites.find((item) => item._id === doctor._id);

  if (exists) {
    updated = favourites.filter((item) => item._id !== doctor._id);
  } else {
    updated = [...favourites, doctor];
  }

  setFavourites(updated);
  localStorage.setItem("favouriteDoctors", JSON.stringify(updated));
};


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

          <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0",
  }}
>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="form-select"
    style={{
      width: "250px",
      borderRadius: "10px",
      fontWeight: "600",
    }}
  >
    <option value="default">Sort By</option>
    <option value="name">Name (A-Z)</option>
    <option value="feeLow">Fee (Low to High)</option>
    <option value="feeHigh">Fee (High to Low)</option>
    <option value="experience">Experience (High to Low)</option>
  </select>
</div>

          <div className="row g-4">

            {sortedDoctors.length === 0 ? (
              <p>No Doctors Found</p>
            ) : (
              sortedDoctors.map((item) => (
                <div className="col-lg-3 col-md-6" key={item._id}>

                  <div className="doctor-card">
<div style={{ textAlign: "right" }}>
  <span
    style={{
      fontSize: "26px",
      cursor: "pointer",
      userSelect: "none",
    }}
    onClick={() => toggleFavourite(item)}
  >
    {favourites.some((doc) => doc._id === item._id) ? "❤️" : "🤍"}
  </span>
</div>
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

                    <p style={{ display: "flex" }}>
  <strong>Experience :</strong>&nbsp;
  {item.experience} Years
</p>

{
item.availability ?

<p
style={{color:"green"}}
>
🟢 Available
</p>

:

<p
style={{color:"red"}}
>
🔴 Offline
</p>

}

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