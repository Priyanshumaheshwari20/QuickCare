import React,{useEffect,useState} from "react";
import axios from "axios";
import "./MyPrescription.css";


function MyPrescription(){

const [prescriptions,setPrescriptions]=useState([]);


useEffect(()=>{


const getData=async()=>{

const id=localStorage.getItem("patientId");


const res=await axios.get(
`http://localhost:5000/api/prescriptions/patient/${id}`
);


setPrescriptions(res.data.prescriptions);


}


getData();


},[]);



return(

<div className="myprescription">


<h2>
My Prescriptions
</h2>


{
prescriptions.map((item)=>(


<div className="pdf-card" key={item._id}>


<h4>
Doctor: Dr. {item.doctorId?.name}
</h4>


<p>
Diagnosis:
{item.diagnosis}
</p>


<p>
Advice:
{item.advice}
</p>


<p>
Date & Time:
{
 new Date(item.createdAt).toLocaleString()
}
</p>

{
item.pdf && (

<a
href={`http://localhost:5000/${item.pdf}`}
download
>

<button>
Download PDF
</button>

</a>

)
}


</div>


))
}


</div>

)

}


export default MyPrescription;