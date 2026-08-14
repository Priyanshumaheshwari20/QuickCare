import React,{useEffect,useMemo,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DoctorLayout from "../DoctorLayout/DoctorLayout";
import AppointmentSort from "./AppointmentSort";
import {
FaCalendarCheck,
FaClock,
FaCheckCircle,
FaSearch,
FaCalendarAlt,
FaVideo,
FaChevronRight
} from "react-icons/fa";

import "./ViewAllAppointment.css";

function ViewAllAppointment(){

const navigate=useNavigate();

const [appointments,setAppointments]=useState([]);
const [activeFilter,setActiveFilter]=useState("All");
const [search,setSearch]=useState("");
const [selectedDate,setSelectedDate]=useState("");
const [loading,setLoading]=useState(true);
const [sortType,setSortType]=useState("latest");
const doctorId=localStorage.getItem("doctorId");

useEffect(()=>{
fetchAppointments();
},[]);

const fetchAppointments=async()=>{

try{

setLoading(true);

if(!doctorId){
setAppointments([]);
return;
}

const res=await axios.get(
`https://quickcare-3.onrender.com/api/appointments/doctor/${doctorId}`
);

const data=Array.isArray(res.data)
?res.data
:res.data?.appointments||[];

setAppointments(data);

}catch(err){

console.log(err);
setAppointments([]);

}finally{

setLoading(false);

}

};

const handleStatusChange=async(id,status)=>{

try{

await axios.patch(
`https://quickcare-3.onrender.com/api/appointments/status/${id}`,
{status}
);

fetchAppointments();

}catch(err){

console.log(err);

}

};const parseDate=(date)=>{

if(!date) return null;

const value=String(date).trim();

if(value.includes("-")){

const parts=value.split("-");

if(parts.length>=3 && parts[0].length===4){

const d=new Date(
Number(parts[0]),
Number(parts[1])-1,
Number(parts[2].substring(0,2))
);

if(!isNaN(d.getTime())) return d;
}

if(parts.length>=3){

let year=Number(parts[2].substring(0,4));
if(year<100) year=2000+year;

const d=new Date(
year,
Number(parts[1])-1,
Number(parts[0])
);

if(!isNaN(d.getTime())) return d;
}
}

if(value.includes("/")){

const parts=value.split("/");

if(parts.length>=3){

let year=Number(parts[2].substring(0,4));
if(year<100) year=2000+year;

const d=new Date(
year,
Number(parts[1])-1,
Number(parts[0])
);

if(!isNaN(d.getTime())) return d;
}
}

const d=new Date(value);
return isNaN(d.getTime())?null:d;

};

const formatDate=(date)=>{

const d=parseDate(date);

if(!d) return date||"-";

return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;

};

const getDateKey=(date)=>{

const d=parseDate(date);

if(!d) return "";

return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

};

const getTodayKey=()=>{

const d=new Date();

return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

};

const getTimeInMinutes=(time)=>{

if(!time) return 0;

const value=String(time).trim().toUpperCase();

const match12=value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);

if(match12){

let h=Number(match12[1]);
const m=Number(match12[2]);

if(match12[3]==="AM" && h===12) h=0;
if(match12[3]==="PM" && h!==12) h+=12;

return h*60+m;
}

const match24=value.match(/^(\d{1,2}):(\d{2})$/);

if(match24){
return Number(match24[1])*60+Number(match24[2]);
}

return 0;

};

const isUpcoming=(appointment)=>{

if(!appointment) return false;

const d=parseDate(appointment.date);
if(!d) return false;

const status=appointment.status?.toLowerCase();

if(status==="completed" || status==="cancelled") return false;

const now=new Date();

const today=new Date(
now.getFullYear(),
now.getMonth(),
now.getDate()
);

const appDate=new Date(
d.getFullYear(),
d.getMonth(),
d.getDate()
);

if(appDate>today) return true;
if(appDate<today) return false;

return getTimeInMinutes(appointment.time)>
(now.getHours()*60+now.getMinutes());

};


const upcomingAppointments=useMemo(()=>{
return appointments.filter(item=>isUpcoming(item));
},[appointments]);

const completedAppointments=useMemo(()=>{
return appointments.filter(item=>item.status?.toLowerCase()==="completed");
},[appointments]);

const cancelledAppointments=useMemo(()=>{
return appointments.filter(item=>item.status?.toLowerCase()==="cancelled");
},[appointments]);

const todayAppointments=useMemo(()=>{
const todayKey=getTodayKey();
return appointments.filter(item=>
getDateKey(item.date)===todayKey &&
item.status?.toLowerCase()!=="cancelled"
);
},[appointments]);

const filteredAppointments=useMemo(()=>{

let data=appointments.filter(item=>item.status?.toLowerCase()!=="cancelled");

if(search.trim()){

const value=search.trim().toLowerCase();

data=data.filter(item=>
item.patientId?.name?.toLowerCase().includes(value)
);

}

if(activeFilter==="Upcoming"){
data=data.filter(item=>isUpcoming(item));
}

if(activeFilter==="Completed"){
data=data.filter(item=>item.status?.toLowerCase()==="completed");
}

if(activeFilter==="Cancelled"){
data=appointments.filter(item=>item.status?.toLowerCase()==="cancelled");
}

if(selectedDate){
data=data.filter(item=>getDateKey(item.date)===selectedDate);
}

data.sort((a,b)=>{

const dateA=parseDate(a.date)?.getTime()||0;
const dateB=parseDate(b.date)?.getTime()||0;

if(sortType==="latest") return dateB-dateA;
if(sortType==="oldest") return dateA-dateB;

if(sortType==="az"){
return (a.patientId?.name||"").localeCompare(b.patientId?.name||"");
}

if(sortType==="za"){
return (b.patientId?.name||"").localeCompare(a.patientId?.name||"");
}

return 0;

});

return data;

},[
appointments,
activeFilter,
search,
selectedDate,
sortType
]);

const getDisplayStatus=(appointment)=>{

const status=appointment.status?.toLowerCase();

if(status==="cancelled") return "Cancelled";
if(status==="completed") return "Completed";
if(isUpcoming(appointment)) return "Upcoming";

return appointment.status||"Pending";

};

const getCount=(filter)=>{

if(filter==="All"){
return appointments.filter(item=>item.status?.toLowerCase()!=="cancelled").length;
}

if(filter==="Upcoming") return upcomingAppointments.length;
if(filter==="Completed") return completedAppointments.length;
if(filter==="Cancelled") return cancelledAppointments.length;

return 0;

};

const deleteAppointment=async(id)=>{

try{

await axios.delete(
`https://quickcare-3.onrender.com/api/appointments/permanent/${id}`
);

fetchAppointments();

}catch(err){

console.log(err);

}

};
return(
<>
<DoctorLayout>

<div  className="view-all-appointment">

<div className="vaa-header">

<div>
<h1>All Appointments</h1>
<p>Manage and track all your patient appointments</p>
</div>

<div className="vaa-doctor-badge">
<div className="doctor-badge-icon">👨‍⚕️</div>

<div>
<small>Doctor</small>
<strong>{localStorage.getItem("doctorName")||"Doctor"}</strong>
</div>

</div>

</div>


<div className="vaa-stats">

<div className="vaa-stat-card">
<div className="stat-icon total">
<FaCalendarCheck/>
</div>

<div>
<span>Total Appointments</span>
<h2>{appointments.length}</h2>
</div>
</div>


<div className="vaa-stat-card">
<div className="stat-icon today">
<FaCalendarAlt/>
</div>

<div>
<span>Today</span>
<h2>{todayAppointments.length}</h2>
</div>
</div>


<div className="vaa-stat-card">
<div className="stat-icon upcoming">
<FaClock/>
</div>

<div>
<span>Upcoming</span>
<h2>{upcomingAppointments.length}</h2>
</div>
</div>


<div className="vaa-stat-card">
<div className="stat-icon completed">
<FaCheckCircle/>
</div>

<div>
<span>Completed</span>
<h2>{completedAppointments.length}</h2>
</div>
</div>

</div>


<div className="vaa-main-card">

<div className="vaa-toolbar">

<div className="vaa-search">
<FaSearch/>

<input
type="text"
placeholder="Search patient..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<AppointmentSort
sortType={sortType}
setSortType={setSortType}
/>

<div className="vaa-date">

<FaCalendarAlt/>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
/>

{selectedDate&&(
<button
className="clear-date"
type="button"
onClick={()=>setSelectedDate("")}
>
×
</button>
)}

</div>

</div>


<div className="vaa-filters">

{["All","Upcoming","Completed","Cancelled"].map(filter=>(

<button
key={filter}
type="button"
className={activeFilter===filter?"active":""}
onClick={()=>setActiveFilter(filter)}
>

{filter}
<span>{getCount(filter)}</span>

</button>

))}

</div>


<div className="vaa-table-wrapper">

{loading?(
<div className="vaa-loading">
Loading appointments...
</div>
):(

<table className="vaa-table">

<thead>

<tr>
<th>Patient</th>
<th>Date</th>
<th>Time</th>
<th>Consultation</th>
<th>Status</th>
<th>Action</th>
<th>Give Prescription</th>
</tr>

</thead>
<tbody>

{
filteredAppointments.length > 0 ? (

filteredAppointments.map((appointment)=>(

<tr key={appointment._id}>

<td>

<div className="patient-info">

<div className="patient-avatar">
{appointment.patientId?.name?.charAt(0).toUpperCase() || "P"}
</div>

<div>
<strong>
{appointment.patientId?.name || "Patient"}
</strong>

<small>
{appointment.patientId?.email || "No Email"}
</small>
</div>

</div>

</td>

<td>
<span className="date-text">
{formatDate(appointment.date)}
</span>
</td>

<td>
<span className="time-text">
<FaClock/>
{appointment.time || "--"}
</span>
</td>

<td>

<span className="consultation-badge">
<FaVideo/>
Video Consultation
</span>

</td>

<td>

<select
className="status-dropdown"
value={appointment.status || "Pending"}
onChange={(e)=>
handleStatusChange(
appointment._id,
e.target.value
)
}
>

<option value="Pending">Pending</option>
<option value="Waiting">Waiting</option>
<option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
<option value="Cancelled">Cancelled</option>

</select>

</td>

<td>

{
appointment.status?.toLowerCase()==="cancelled" ? (

<button
className="delete-btn"
onClick={()=>
deleteAppointment(appointment._id)
}
>
Delete
</button>

) : (

<button
className="view-btn"
onClick={()=>
navigate(
`/medical-history/${appointment.patientId._id}`
)
}
>

View
<FaChevronRight/>

</button>

)
}

</td>

<td>

<button
className="view-btn"
onClick={()=>{

localStorage.setItem(
"appointmentId",
appointment._id
);

navigate(
`/prescription/${appointment._id}`,
{
state:{
appointment
}
}
);

}}
>

Give Prescription

</button>

</td>

</tr>

))

) : (

<tr>

<td colSpan="7">

<div className="empty-state">

<div className="empty-icon">
<FaCalendarAlt/>
</div>

<h3>No appointments found</h3>

<p>
No appointments match your current filter.
</p>

</div>

</td>

</tr>

)
}

</tbody>


</table>

)}

</div>

{!loading && (

<div className="vaa-footer">

<span>

Showing

<strong>
{" "}{filteredAppointments.length}{" "}
</strong>

of

<strong>
{" "}{appointments.length}{" "}
</strong>

appointments

</span>

</div>

)}

</div>
</div>
</DoctorLayout>

</>
);

}

export default ViewAllAppointment;