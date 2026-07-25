import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBell } from "react-icons/fa";
import "./Header.css";
import axios from "axios";
function Header() {

  const navigate = useNavigate();

  const [patient, setPatient] = useState(
  localStorage.getItem("patientName") || ""
);


useEffect(() => {

const updateName = () => {

setPatient(
localStorage.getItem("patientName") || ""
);

};


window.addEventListener(
"patientUpdated",
updateName
);


return () => {

window.removeEventListener(
"patientUpdated",
updateName
);

};


}, []);




  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="patient-header">

      <div>

        <p className="welcome-text">
          Welcome Back 👋
        </p>

        <h2>{patient}</h2>

        <span className="today-date">
          {today}
        </span>

      </div>

      <div className="header-right">

        <div className="notification">
          <FaBell />
        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          Back To Home
        </button>

      </div>

    </div>

  );

}

export default Header;