import React from "react";
import {
  FaBell,
  FaSearch,
  FaCalendarAlt
} from "react-icons/fa";

import "./Header.css";
import { useNavigate } from "react-router-dom";
function Header() {
const navigate =useNavigate()
  const doctorName =
    localStorage.getItem("doctorName");

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="dashboard-header">

      {/* Left */}
      <div className="header-left">

        <h2>
          Welcome,
          <span className="doctor-name">
            {" "}
             {doctorName}
          </span>
        </h2>

        <p className="header-date">
          <FaCalendarAlt />
          {today}
        </p>

      </div>

      {/* Right */}
      <button style={{padding:"10px"  , background:"black"  , border:"1px solid white" , borderRadius:"22px" , color:"white"}} 
      onClick={()=>navigate("/")}> back to home</button>

    </div>

  );
}

export default Header;