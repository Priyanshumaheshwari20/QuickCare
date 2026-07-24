import React from "react";
import  "../SelectRole/SelectRole.css"
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
function SelectRole() {
  return (
    <>
    <div className="role-page">

      {/* Navbar */}

      <nav className="role-navbar">

        <div className="logo">

          <h2>🩺 TeleCare</h2>

          <p>Your Health, Our Priority</p>

        </div>

        <Link to="/" className="back-home">
          🏠 Back to Home
        </Link>

      </nav>

      {/* Main Card */}

      <div className="role-container">

        <div className="role-icon">
          👥
        </div>

        <h1>Select Role</h1>

        <p className="subtitle">
          Choose your role to continue to your account
        </p>

        <div className="role-cards">

          {/* Patient */}

          <div className="role-card">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt=""
            />

            <h2>Patient</h2>

            <p>
              Book appointments, consult doctors and manage your
              health easily.
            </p>

            <Link to="/patient-signup">
              <button className="patient-btn">
                Continue as Patient
              </button>
            </Link>

          </div>

          {/* Doctor */}

          <div className="role-card">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2785/2785544.png"
              alt=""
            />

            <h2 className="doctor-heading">
              Doctor
            </h2>

            <p>
              Manage your appointments, consultations and patients
              efficiently.
            </p>

            <Link to="/DoctorSignup">
              <button className="doctor-btn">
                Continue as Doctor
              </button>
            </Link>

          </div>

        </div>

        <div className="secure">
          🔒 Your information is safe and secure with us.
        </div>

      </div>

    </div>

<Footer/>

    </>
  );
}

export default SelectRole;