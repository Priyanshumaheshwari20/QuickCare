import React, {useEffect, useState} from "react";
import axios from "axios";
import "./MyProfile.css";
import Navbar from "../Home/Navbar/Navbar";

function MyProfile(){

const [patient,setPatient] = useState({});

const patientId = localStorage.getItem("patientId");


useEffect(()=>{
const fetchProfile = async()=>{
try{
const res = await axios.get(
`http://localhost:5000/api/patients/${patientId}`);

setPatient(res.data.patient);
}
catch(error){
console.log(error);
}}

fetchProfile();

},[patientId]);

return(
    <>
<Navbar/>
<div className="profile-page">
<div className="profile-card">
<div className="profile-top">

<h2>Welcome, {patient.name}</h2>
<button>Edit</button>
</div>
<div className="profile-user">
<div className="profile-avatar">
👤
</div>
<div>
<h3>{patient.name}</h3>
</div>


</div>

<div className="profile-form">

<div className="field">

<label>Full Name</label>

<input value={patient.name || ""}readOnly/>

</div>

<div className="field">
<label>Email Address</label>

<input value={patient.email || ""}readOnly/>
</div>

<div className="field">

<label>Gender</label>

<input value={patient.gender || ""}readOnly
/>
</div>

<div className="field">

<label>Age</label>

<input value={patient.age || ""}readOnly/>
</div>

<div className="field">
<label>Phone Number</label>
<input 
value={patient.phoneNumber || ""}
readOnly
/>

</div>
<div className="field">

<label>Place</label>
<input 
value={patient.place || ""}
readOnly
/>

</div>
</div>
</div>
</div>

</>
)}
export default MyProfile;