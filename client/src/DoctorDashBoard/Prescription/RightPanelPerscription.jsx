import React from "react";
import "./PrescriptionPage.css";
import { useNavigate } from "react-router-dom";
import socket from "../../Socket/socket";
import axios from "axios";

function RightPanel({
  appointment,
  pdfFile,
  setPdfFile,
  handleUploadPDF,
}) {

  const navigate = useNavigate();

  const doctorId = localStorage.getItem("doctorId");


  const handleStartCall = async()=>{

    try{

      await axios.put(
        `https://quickcare-3.onrender.com/api/appointments/status/${appointment._id}`,
        {
          status:"Waiting"
        }
      );


      socket.emit("call-patient",{

        doctorId,

        patientId: appointment.patientId._id,

        appointmentId: appointment._id

      });



      navigate(`/calling/${appointment._id}`);


    }catch(error){

      console.log(error);

    }

  };


  return (
    <div className="right-panel">


      <div className="info-card">

        <h3>Patient Information</h3>

        <h4>{appointment?.patientId?.name}</h4>

        <p>
          <strong>Age :</strong> {appointment?.patientId?.age}
        </p>

        <p>
          <strong>Gender :</strong> {appointment?.patientId?.gender}
        </p>

        <p>
          <strong>Blood Group :</strong>{" "}
          {appointment?.patientId?.bloodGroup || "N/A"}
        </p>

        <p>
          <strong>Phone :</strong>{" "}
          {appointment?.patientId?.phoneNumber}
        </p>

        <p>
          <strong>Email :</strong>{" "}
          {appointment?.patientId?.email}
        </p>

        <p>
          <strong>Emergency Contact :</strong>{" "}
          {appointment?.patientId?.emergencyContact || "N/A"}
        </p>

      </div>



      <div className="info-card">

        <h3>General Information</h3>

        <p>
          <strong>State :</strong>{" "}
          {appointment?.patientId?.state || "N/A"}
        </p>

        <p>
          <strong>City :</strong>{" "}
          {appointment?.patientId?.city || "N/A"}
        </p>

        <p>
          <strong>Address :</strong>{" "}
          {appointment?.patientId?.address || "N/A"}
        </p>

        <p>
          <strong>Pincode :</strong>{" "}
          {appointment?.patientId?.pinCode || "N/A"}
        </p>

        <p>
          <strong>Height :</strong>{" "}
          {appointment?.patientId?.height || "N/A"}
        </p>

        <p>
          <strong>Weight :</strong>{" "}
          {appointment?.patientId?.weight || "N/A"}
        </p>

      </div>



      <div className="info-card">

        <h3>Medical Report</h3>


        <div className="file-upload">


          <input
            type="file"
            accept="application/pdf"
            onChange={(e)=>setPdfFile(e.target.files[0])}
          />


          <button
            className="upload-btn"
            onClick={handleUploadPDF}
          >

            Upload Report

          </button>


        </div>


      </div>




      <div className="info-card video-card">

        <h3>Consultation</h3>


        <button 
          className="start-call-btn"
          onClick={handleStartCall}
        >

          Start Video Call

        </button>


      </div>


    </div>
  );
}


export default RightPanel;