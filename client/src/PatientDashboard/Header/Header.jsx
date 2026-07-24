import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header(){
const navigate = useNavigate()
const name = localStorage.getItem("patientName");
return(
<div className="patient-header">


<h2>
Welcome, <span>{name}</span>
</h2>


<button  style={{padding:"10px"   , color:"white" , background:"black" ,  border :"2px solid black", borderRadius:"30px"}} onClick={() => navigate("/")}  > Back to Home</button>


</div>
)
}
export default Header;