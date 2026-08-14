import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PrescriptionList.css";


function PrescriptionList(){
const [prescriptions,setPrescriptions]=useState([]);
useEffect(()=>{
const getPrescription=async()=>{
const id=localStorage.getItem("patientId");
const res=await axios.get(`https://quickcare-3.onrender.com/api/prescriptions/patient/${id}`);
setPrescriptions(res.data.prescriptions);
}
getPrescription();
},[]);
return(

<div className="prescription-card">


<h3>
My Prescription
</h3>

<Link to="/MyPrescription">

<button className="prescription-btn">
View All Prescriptions
</button>

</Link>


{
prescriptions.map((item)=>(


<div className="prescription-item"
key={item._id}>




<p>
<strong>Diagnosis :</strong> {item.diagnosis}
</p>

<p>
<strong>Advice :</strong> {item.advice}
</p>
</div>


))
}


</div>


)


}


export default PrescriptionList;