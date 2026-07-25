import { Link } from "react-router-dom";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
function Navbar() {
  const navigate = useNavigate()
const [patientName, setPatientName] = useState("");
const[doctorName , setDoctorName]=useState("");
const [role,setRole] = useState("");
  useEffect(() => {

const updateUser = () => {

    const patient = localStorage.getItem("patientName");
    const doctor = localStorage.getItem("doctorName");
    const userRole = localStorage.getItem("role");

    setPatientName(patient || "");
    setDoctorName(doctor || "");
    setRole(userRole || "");

};
updateUser();
window.addEventListener(
    "storage",
    updateUser
  );

return () => {
    window.removeEventListener(
      "storage",
      updateUser
    );
};
}, []);

const isLoggedIn =
  role === "doctor"
    ? !!doctorName
    : !!patientName;


  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <div className="navbar-brand d-flex align-items-center"  style={{ cursor: "pointer" }} onClick ={()=>navigate("/")}>
          <span className="fs-3 me-2">🩺</span>
          <h3 className="mb-0 fw-bold text-primary">QuickCare</h3>
        </div>

        {/* Mobile Button */}
        <button  className="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0  gap-lg-4"  >

            
              <div className="nav-link fw-semibold" style={{cursor:"pointer"}} onClick ={()=>navigate("/")}>
                Home
              </div>
            


              <div className="nav-link fw-semibold" style={{cursor:"pointer"}} onClick={() => navigate("/DoctorList")}>
                Doctor
              </div>
                

<div className="nav-link fw-semibold" style={{cursor:"pointer"}} onClick={()=>navigate("/About")}>
                About
              </div>



           

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#contact">
                Contact
              </a>
            </li>

          </ul>

          {/* Buttons */}
          <div className="d-flex gap-2">

            {
  !isLoggedIn && (
    <Link to="/login">
      <button className="btn btn-outline-primary">
        Login
      </button>
    </Link>
  )
}

  
{
  isLoggedIn ? (

    <div className="dropdown profile-dropdown">

      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        👤 {role === "doctor" ? doctorName : patientName}
      </button>

      <ul className="dropdown-menu">

        <li>
          <Link className="dropdown-item" to="/MyProfile">
            👤 My Profile
          </Link>
        </li>

        {
          role === "doctor" ? (
            <li>
              <Link className="dropdown-item" to="/DoctorDashboard">
                📊 Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link className="dropdown-item" to="/PatientDashboard">
                📊 My Dashboard
              </Link>
            </li>
          )
        }


        {role === "patient" && (
  <li>
    <Link className="dropdown-item" to="/favourites">
      ❤️ Favourite Doctors
    </Link>
  </li>
)}

        <li><hr className="dropdown-divider" /></li>

        <li>
          <button
            className="dropdown-item text-danger"
            onClick={() => {
              localStorage.removeItem("patientName");
              localStorage.removeItem("patientId");
              localStorage.removeItem("doctorName");
              localStorage.removeItem("doctorId");
              localStorage.removeItem("token");
              localStorage.removeItem("role");

              window.location.reload();
            }}
          >
            🚪 Logout
          </button>
        </li>

      </ul>

    </div>

  ) : (

    <Link to="/SelectRole">
      <button className="btn btn-primary"  >
        Register
      </button>
    </Link>

  )
}

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;