import React, { useState, useEffect } from "react";
import { useNavigate,useLocation , useParams} from "react-router-dom";
import RightPanel from "./RightPanelPerscription";
import Diagnosis from "./Diagnosis";
import AdviceSection from "./Advice";
import PrescriptionActions from "./PrescriptionActions";
import axios from "axios";
import MedicineSection from "./MedicineSection";
import "./PrescriptionPage.css";
import { toast } from "react-toastify";
import DoctorLayout from "../DoctorLayout/DoctorLayout";

function PrescriptionPage(){
const location = useLocation();
const { appointmentId } = useParams();

console.log(appointmentId);

const [appointment, setAppointment] = useState(
  location.state?.appointment || null
);
  const navigate = useNavigate();
const [reportId, setReportId] = useState(null);
const [loading,setLoading] = useState(false);
const [diagnosis,setDiagnosis] = useState("");
const [advice,setAdvice] = useState("");
const [pdfFile, setPdfFile] = useState(null);
 const symptomOptions = [
  "Fever",
  "Headache",
  "Cough",
  "Cold",
  "Body Pain",
  "Sore Throat",
  "Vomiting",
  "Nausea",
  "Chest Pain",
  "Fatigue",
  "Dizziness",
  "Joint Pain",
  "Abdominal Pain",
  "Diarrhea"
];

const handleSymptomChange = (symptom) => {

  if (symptoms.includes(symptom)) {

    setSymptoms(
      symptoms.filter(item => item !== symptom)
    );

  } else {

    setSymptoms([
      ...symptoms,
      symptom
    ]);

  }

};

const [symptoms, setSymptoms] = useState([]);

 const [newSymptom,setNewSymptom] = useState("");

 const [medicines,setMedicines] = useState([

        {
            medicine:"",
            dosage:"",
            frequency:"",
            duration:"",
            instruction:""
        }

    ]);


    useEffect(() => {
  if (appointment) return;

  const getAppointment = async () => {
    try {
      const res = await axios.get(
        `https://quickcare-3.onrender.com/api/appointments/${appointmentId}`
      );

      setAppointment(res.data.appointment);
    } catch (error) {
      console.log(error);
    }
  };

  if (appointmentId) {
    getAppointment();
  }
}, [appointment, appointmentId]);
const handleMedicineChange=(index,field,value)=>{
const updated=[...medicines];
updated[index][field]=value;
setMedicines(updated);
};

const addMedicine=()=>{
 setMedicines([    ...medicines,
     {         medicine:"",
                dosage:"",
                frequency:"",
                duration:"",
                instruction:""

            }

        ]);


    };

const removeMedicine=(index)=>{
const updated = medicines.filter(
(_,i)=>i!==index );
 setMedicines(updated);
};

const addSymptom = () => {

if(newSymptom.trim()==="") return;

if(!symptoms.includes(newSymptom)){

setSymptoms([
...symptoms,
newSymptom
]);

}

setNewSymptom("");

};

const handleUploadPDF = async () => {
  try {
    if (!pdfFile) {
      toast.error("Please select PDF first");
      return null;
    }

    const formData = new FormData();

    formData.append("pdf", pdfFile);
    formData.append("patientId", appointment.patientId._id);
    formData.append(
      "doctorId",
      appointment.doctorId._id || appointment.doctorId
    );

    const response = await axios.post(
      "https://quickcare-3.onrender.com/api/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("PDF Uploaded Successfully");

    const uploadedReportId = response.data.document._id;

    setReportId(uploadedReportId);

    return uploadedReportId;   // 👈 ye line add karo

  } catch (error) {
    console.log(error);
    toast.error("PDF Upload Failed");
    return null;
  }
};
 const handleSavePrescription = async()=>{
  try{
 setLoading(true);
 console.log("Report ID:", reportId);

const data={
                 appointmentId:
                appointment._id,


             doctorId:
appointment.doctorId._id || appointment.doctorId,


                patientId:
                appointment.patientId._id,


                symptoms,
                 diagnosis,
               medicines,
                 advice,
 report: reportId

            };

          const response = await axios.post(  "https://quickcare-3.onrender.com/api/prescriptions",  data); 
          await axios.put(
  `https://quickcare-3.onrender.com/api/appointments/status/${appointment._id}`,
  {
    status: "Completed",
  }
);
          toast.success(
 response.data.message || "Prescription Saved"
);
navigate("/DoctorDashboard");
}

 catch(error){
console.log(error);
     toast.error( "Prescription Failed");


        }


        finally{


            setLoading(false);
}};
    if(!appointment){
     return <h2>Loading...</h2>
    }
        return (
<DoctorLayout>

        <div className="prescription-page">


            {
                loading &&

                <div className="loader">

                    Saving Prescription...

                </div>
            }



            {/* Patient Header */}


            <div className="patient-header">
                <div className="patient-left">
                 {/* image lagegi yaha  */}
                       <div>


<h2><span style={{   fontFamily: "Georgia",   fontSize: "18px",   fontWeight: "600",   color: "#555", }}
  > Patient Name :</span>

  <span  style={{    fontFamily: "Poppins",    fontSize: "26px",    fontWeight: "700",    color: "#1e3a8a",    marginLeft: "10px",
    }}>
    {appointment.patientId.name}
  </span>
</h2>
                 <p>
                            &nbsp;
                {appointment.patientId.gender}
                  </p>

                   <p>  Date & Time   : {appointment.date} &nbsp; {appointment.time}</p> 

 </div>
 </div>

 

  <div className="patient-right">


                   
<h4>    Status </h4>
   <span className="status-tag">     {appointment.status} </span>
  </div>
</div>

{/* MAIN CONTAINER */}

<div className="main-container">
 {/* LEFT PANEL */}
<div className="left-panel">
  <div className="tabs">
   <button className="active">       Consultation
   </button>
</div>

 {/* Symptoms */}
<div className="card">

<h3>Symptoms</h3>

<div className="symptom-grid">
{
  symptomOptions.map((symptom,index)=>(

<label key={index} className="symptom-checkbox">

<input type="checkbox" checked={symptoms.includes(symptom)}onChange={() => handleSymptomChange(symptom)}
/>

<span>{symptom}</span>

</label>

))
}
</div>

<div className="add-symptom">

<input

type="text" placeholder="Other Symptom"value={newSymptom}onChange={(e)=>setNewSymptom(e.target.value)}
/>

<button onClick={addSymptom}>

Add

</button>

</div>

</div>

{/* Diagnosis */}
 <Diagnosis  diagnosis={diagnosis}
  setDiagnosis={setDiagnosis}
/>

 {/* Medicine Section */}

<MedicineSection
  medicines={medicines}
  addMedicine={addMedicine}
  removeMedicine={removeMedicine}
  handleMedicineChange={handleMedicineChange}
/>

                    {/* Advice */}

{/* Advice */}

<AdviceSection
  advice={advice}
  setAdvice={setAdvice}
/>

<PrescriptionActions
  handleSavePrescription={handleSavePrescription}
/>

</div> {/* LEFT PANEL END */}


{/* RIGHT PANEL */}

<RightPanel
  appointment={appointment}
  pdfFile={pdfFile}
  setPdfFile={setPdfFile}
  handleUploadPDF={handleUploadPDF}
/>

</div> {/* MAIN CONTAINER END */}

</div> 
</DoctorLayout>
);
}

export default PrescriptionPage;