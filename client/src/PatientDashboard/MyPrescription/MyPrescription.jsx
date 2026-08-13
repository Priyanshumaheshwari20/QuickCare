import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyPrescription.css";
import { toast } from "react-toastify";

function MyPrescription(){
const navigate = useNavigate()
const [prescriptions,setPrescriptions]=useState([]);


useEffect(()=>{

const getData=async()=>{

try{

const id= localStorage.getItem("patientId");

const res=await axios.get(
`http://localhost:5000/api/prescriptions/patient/${id}`
);

setPrescriptions(res.data.prescriptions || []);
console.log(res.data.prescriptions);
}

catch(err){
console.log(err);
}

}

getData();

},[]);

const deletePrescription = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this prescription?"
  );

  if (!confirmDelete) return;

  try {

    const res = await axios.delete(
      `http://localhost:5000/api/prescriptions/${id}`
    );

    if (res.data.success) {

      setPrescriptions((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Prescription Deleted Successfully ✅");

    }

  } catch (error) {

    console.log(error);
    toast.error("Failed to Delete Prescription ❌");

  }

};
return(

<div className="prescription-wrapper">


<div className="top-section">

<div>

<h1>
QuickCare
</h1>

<p>
All your prescriptions in one place
</p>

</div>


< button onClick= {()=> navigate("/PatientDashboard")}className="back-to-home">
back to home
</button>


</div>





<div className="prescription-grid">


{

prescriptions.map((item)=>(


<div className="prescription-box" key={item._id}>


<div className="doctor-header">


<div className="doctor-icon">
👨‍⚕️
</div>


<div>

<h2>{item.doctorId?.name}  </h2>

<span>
✔ Verified Medical Expert
</span>


</div>


</div>





<div className="info-row">

<div className="info-card">

<small>
Diagnosis
</small>

<h3>
{item.diagnosis}
</h3>

<small>
Symptoms
</small>

<h3  style={{color:"blueviolet"}} >
{
  Array.isArray(item.symptoms)
    ? item.symptoms.join(", ")
    : item.symptoms || "Not mentioned"
}
</h3>

</div>



<div className="info-card">

<small>
Date
</small>

<h3>
{
  new Date(item.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}
</h3>


</div>


</div>






<div className="advice">


<h4>
Doctor Advice
</h4>

<p>
{item.advice}
</p>


</div>







<div className="medicine-area">


<h4>
Medicines
</h4>



{  item.medicines?.map((med,index)=>(
<div className="medicine" key={index}>

<div>

<h3>💊 {med.medicine} </h3>

<p>Dosage : {med.dosage}</p>
</div>
<div>
    <p><strong>Frequency:</strong> {med.frequency}</p>

<p><strong> Duration :</strong>{med.duration}</p>
<p><strong> Timing:</strong> {med.instruction}</p>
</div>



</div>


))

}



</div>







<div className="bottom">


<p>
✍ Doctor Signature
</p>


<div className="button-group">

  {
    item.pdf && (
      <a
        href={`http://localhost:5000/${item.pdf}`}
        target="_blank"
        rel="noreferrer"
        download
      >
        <button className="download-btn">
          Download PDF
        </button>
      </a>
    )
  }

  <button
    className="delete-btn"
    onClick={() => deletePrescription(item._id)}
  >
    Delete
  </button>

</div>



</div>





</div>


))

}



</div>


</div>

)

}


export default MyPrescription;