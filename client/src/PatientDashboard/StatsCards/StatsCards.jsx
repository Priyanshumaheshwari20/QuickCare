import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StatsCards.css";

function StatsCards(){

const [appointments,setAppointments]=useState([]);
const navigate =useNavigate()
useEffect(()=>{

const fetchData=async()=>{

const patientId=localStorage.getItem("patientId");

const res=await axios.get(
`http://localhost:5000/api/appointments/patient/${patientId}`
);

setAppointments(res.data.appointments);

}

fetchData();

},[]);

const total=appointments.length;

const upcoming=
appointments.filter(item=>item.status==="Pending").length;

const completed=
appointments.filter(item=>item.status==="Completed").length;

const cancelled=
appointments.filter(item=>item.status==="Cancelled").length;

return(
<>
<div className="stats-container">

<div className="stat-card">

<div className="stat-icon">
📅
</div>

<h2>{total}</h2>

<p>Total Appointments</p>

</div>

<div className="stat-card">

<div className="stat-icon">
⏳
</div>

<h2>{upcoming}</h2>

<p>Pending</p>

</div>

<div className="stat-card">

<div className="stat-icon">
✅
</div>

<h2>{completed}</h2>

<p>Completed</p>

</div>

<div className="stat-card">

<div className="stat-icon">
❌
</div>

<h2>{cancelled}</h2>

<p>Cancelled</p>

</div>

</div>
</>
)

}

export default StatsCards;