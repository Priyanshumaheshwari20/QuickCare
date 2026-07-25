import React ,{useState, useEffect}from "react";
import axios from "axios";
import {
  FaBell,
  FaSearch,
  FaCalendarAlt
} from "react-icons/fa";

import "./Header.css";

import { useNavigate } from "react-router-dom";
function Header() {

const navigate =useNavigate()
const [availability,setAvailability]=useState(true);
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

  useEffect(()=>{

const getDoctor=async()=>{

const doctorId=localStorage.getItem("doctorId");

const res=await axios.get(
`http://localhost:5000/api/doctors/${doctorId}`
);

setAvailability(res.data.doctor.availability);

}

getDoctor();

},[]);


const handleAvailability=async()=>{

const doctorId=localStorage.getItem("doctorId");

const res=await axios.put(

`http://localhost:5000/api/doctors/availability/${doctorId}`

);

setAvailability(res.data.availability);

}
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
<div
style={{
background:"#fff",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,.1)",
width:"300px"
}}
>

<h3>Availability</h3>

<h2>

{availability ?

"🟢 Available"

:

"🔴 Offline"

}

</h2>

<button

className="btn btn-primary"

onClick={handleAvailability}

>

{availability ?

"Turn OFF"

:

"Turn ON"

}

</button>

</div>
      {/* Right */}
      <button style={{padding:"10px"  , background:"black"  , border:"1px solid white" , borderRadius:"22px" , color:"white"}} 
      onClick={()=>navigate("/")}> back to home</button>

    </div>

  );
}

export default Header;