import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./PatientSidebar.css";

function PatientSidebar() {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/PatientDashboard",
      icon: <FaHome />,
    },
    {
      name: "Appointments",
      path: "/MyAppointments",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Prescriptions",
      path: "/MyPrescription",
      icon: <FaFileMedical />,
    },
    {
      name: "My Profile",
      path: "/MyProfile",
      icon: <FaUser />,
    },
    {
      name: "Settings",
      path: "/Settings",
      icon: <FaCog />,
    },
  ];

  const logout = () => {

    localStorage.clear();

    window.location.href="/";

  };

  return (

<div className="patient-sidebar">

<div className="patient-logo">

<h2>🩺 QuickCare</h2>

<p>Patient Panel</p>

</div>
{/* 
<div className="patient-profile">

<div className="patient-avatar">

👤

</div>

<h4>

{localStorage.getItem("patientName")}

</h4>

<span>

Patient

</span>

</div> */}

<ul>

{
menu.map((item)=>(

<li
key={item.name}
className={
location.pathname===item.path
?
"active"
:
""
}
>

<Link to={item.path}>

{item.icon}

<span>

{item.name}

</span>

</Link>

</li>

))
}

</ul>

<button
className="logout"
onClick={logout}
>

<FaSignOutAlt/>

Logout

</button>

</div>

  );

}

export default PatientSidebar;