import React, {  useState } from "react";
import axios from "axios";
import { useNavigate,useLocation} from "react-router-dom";
import "./PrescriptionPage.css";
import { toast } from "react-toastify";

function PrescriptionPage(){
const location = useLocation();

const appointment = location.state?.appointment;
  const navigate = useNavigate();
const [reportId, setReportId] = useState(null);
const [loading,setLoading] = useState(false);
const [diagnosis,setDiagnosis] = useState("");
const [advice,setAdvice] = useState("");
const [pdfFile, setPdfFile] = useState(null);
 const [symptoms,setSymptoms] = useState([
        "Fever",
        "Headache",
        "Body Pain",
        "Sore Throat"
    ]);

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

const addSymptom=()=>{
 if(newSymptom.trim()==="")
return;
setSymptoms([
  ...symptoms,   newSymptom
]);
setNewSymptom("");
};

 const removeSymptom=(index)=>{
const updated = symptoms.filter(
        (_,i)=>i!==index

        );
 setSymptoms(updated);


    };


    const handleUploadPDF = async()=>{
try{
   if(!pdfFile){
  toast.error("Please select PDF first");
  return;

}
 const formData = new FormData();
 formData.append(
    "pdf",
    pdfFile
);
 formData.append(  "patientId",  appointment.patientId._id);
 formData.append(
  "doctorId",
  appointment.doctorId._id || appointment.doctorId
);
console.log(pdfFile);

console.log("Appointment:", appointment);
console.log("Doctor:", appointment.doctorId);
console.log("Patient:", appointment.patientId);
        const response = await axios.post(

            "http://localhost:5000/api/documents/upload",

            formData,

            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            } );
              toast.success("PDF Uploaded Successfully");

        console.log(response.data);
        setReportId(response.data.document._id);
    }


    catch(error){

        console.log(error);
toast.error("PDF Upload Failed");
    }

};
 const handleSavePrescription = async()=>{
  try{
 setLoading(true);
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

          const response = await axios.post(  "http://localhost:5000/api/prescriptions",  data); 
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


                        <h2>

                            {appointment.patientId.name}

                        </h2>



                        <p>

                            {appointment.patientId.age} Years,

                            &nbsp;

                            {appointment.patientId.gender}

                        </p>



                        <p>

                            {appointment.patientId.phoneNumber}

                        </p>



                        <p>

                            {appointment.patientId.email}

                        </p>



                        <p>

                            {appointment.patientId.place}

                        </p>


                    </div>


                </div>





                <div className="patient-middle">
                    <h4>  Date & Time </h4>
                     <p>{appointment.date} &nbsp; {appointment.time}</p>
                          </div>

  <div className="patient-right">


                    <button
                        className="back-btn"

                        onClick={()=>
                            navigate("/DoctorDashboard")
                        }

                    >

                        Back Dashboard

                    </button>



                    <h4>

                        Status

                    </h4>



                    <span className="status-tag">

                        {appointment.status}

                    </span>



                    <button className="end-btn">

                        End Consultation

                    </button>


                </div>


            </div>








            {/* MAIN CONTAINER */}



            <div className="main-container">





                {/* LEFT PANEL */}



                <div className="left-panel">






                    <div className="tabs">


                        <button className="active">

                            Consultation

                        </button>


                        <button>

                            Medical History

                        </button>


                        <button>

                            Reports

                        </button>


                        <button>

                            Previous Prescription

                        </button>


                        <button>

                            Notes

                        </button>


                    </div>









                    {/* Symptoms */}



                    <div className="card">



                        <h3>

                            Symptoms

                        </h3>




                        <div className="symptoms">


                            {

                                symptoms.map((item,index)=>(


                                    <span key={index}>


                                        {item}


                                        <button

                                            onClick={()=>
                                                removeSymptom(index)
                                            }

                                        >

                                            ×

                                        </button>


                                    </span>


                                ))

                            }



                        </div>






                        <div className="add-symptom">


                            <input

                                type="text"

                                placeholder="Add symptom"

                                value={newSymptom}

                                onChange={(e)=>

                                    setNewSymptom(e.target.value)

                                }

                            />



                            <button

                                onClick={addSymptom}

                            >

                                Add

                            </button>


                        </div>



                    </div>









                    {/* Diagnosis */}




                    <div className="card">


                        <h3>

                            Diagnosis

                        </h3>



                        <textarea


                            placeholder="Enter diagnosis"


                            value={diagnosis}


                            onChange={(e)=>

                                setDiagnosis(
                                    e.target.value
                                )

                            }


                        />



                    </div>








                    {/* Medicine Section */}



                    <div className="card medicine-card">



                        <div className="medicine-header">


                            <h3>

                                Prescription Medicine

                            </h3>



                            <button

                                className="add-medicine-btn"

                                onClick={addMedicine}

                            >

                                + Add Medicine

                            </button>



                        </div>





                        <table>


                            <thead>


                                <tr>


                                    <th>
                                        Medicine
                                    </th>


                                    <th>
                                        Dosage
                                    </th>


                                    <th>
                                        Frequency
                                    </th>


                                    <th>
                                        Duration
                                    </th>


                                    <th>
                                        Instruction
                                    </th>


                                    <th>
                                        Action
                                    </th>



                                </tr>


                            </thead>


                            <tbody></tbody>

                                                            <tbody>


                                {
                                    medicines.map((item,index)=>(


                                        <tr key={index}>


                                            <td>


                                                <input

                                                    type="text"

                                                    value={item.medicine}

                                                    placeholder="Medicine Name"

                                                    onChange={(e)=>

                                                        handleMedicineChange(

                                                            index,

                                                            "medicine",

                                                            e.target.value

                                                        )

                                                    }

                                                />


                                            </td>




                                            <td>


                                                <input

                                                    type="text"

                                                    value={item.dosage}

                                                    placeholder="500mg"

                                                    onChange={(e)=>

                                                        handleMedicineChange(

                                                            index,

                                                            "dosage",

                                                            e.target.value

                                                        )

                                                    }

                                                />


                                            </td>





                                            <td>


                                                <input

                                                    type="text"

                                                    value={item.frequency}

                                                    placeholder="2 times/day"

                                                    onChange={(e)=>

                                                        handleMedicineChange(

                                                            index,

                                                            "frequency",

                                                            e.target.value

                                                        )

                                                    }

                                                />


                                            </td>





                                            <td>


                                                <input

                                                    type="text"

                                                    value={item.duration}

                                                    placeholder="5 days"

                                                    onChange={(e)=>

                                                        handleMedicineChange(

                                                            index,

                                                            "duration",

                                                            e.target.value

                                                        )

                                                    }

                                                />


                                            </td>





                                            <td>


                                                <input

                                                    type="text"

                                                    value={item.instruction}

                                                    placeholder="After meal"

                                                    onChange={(e)=>

                                                        handleMedicineChange(

                                                            index,

                                                            "instruction",

                                                            e.target.value

                                                        )

                                                    }

                                                />


                                            </td>





                                            <td>


                                                <button

                                                    className="delete-btn"

                                                    onClick={()=>removeMedicine(index)}

                                                >

                                                    Delete

                                                </button>


                                            </td>



                                        </tr>


                                    ))
                                }


                                </tbody>


                            </table>



                    </div>









                    {/* Advice */}



                    <div className="card">


                        <h3>

                            Doctor Advice/Instruction

                        </h3>



                        <textarea


                            placeholder="Write advice"


                            value={advice}


                            onChange={(e)=>

                                setAdvice(e.target.value)

                            }


                        />



                    </div>







                    <div className="prescription-actions">


                        <button

                            className="save-btn"

                            onClick={handleSavePrescription}

                        >

                            Save Prescription

                        </button>





                        <button

                            className="cancel-btn"

                            onClick={()=>

                                navigate("/DoctorDashboard")

                            }

                        >

                            Cancel

                        </button>


                    </div>




                </div>









                {/* RIGHT PANEL */}



                <div className="right-panel">





                    <div className="info-card">


                        <h3>

                            Patient Information

                        </h3>




                        



                        <h4>

                            {appointment.patientId.name}

                        </h4>




                        <p>

                            Age :

                            {appointment.patientId.age}

                        </p>



                        <p>

                            Gender :

                            {appointment.patientId.gender}

                        </p>



                        <p>

                            Phone :

                            {appointment.patientId.phoneNumber}

                        </p>



                        <p>

                            Email :

                            {appointment.patientId.email}

                        </p>



                    </div>








                    <div className="info-card">


                        <h3>

                            General Information

                        </h3>



                        <p>

                            Blood Group :

                        </p>



                        <p>

                            Height :

                        </p>



                        <p>

                            Weight :

                        </p>



                    </div>

                    <div className="info-card">
         <h3>   Medical Report</h3>
          
          <input  type="file"  accept="application/pdf"  onChange={(e)=>setPdfFile(e.target.files[0])}/>

<button className="upload-btn" onClick={handleUploadPDF}>
   Upload Report
</button>

                        


                        


                    </div>








                    <div className="info-card video-card">


                        <h3>

                            Consultation

                        </h3>



                        <span className="video-tag">

                            Video Call

                        </span>




                        <button className="start-call-btn">


                            Start Video Call


                        </button>



                    </div>





                </div>




            </div>




        </div>


    );


}


export default PrescriptionPage;