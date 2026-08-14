import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DoctorLayout from "../DoctorLayout/DoctorLayout";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaFileMedical,
} from "react-icons/fa";

import "./MedicalHistory.css";

function MedicalHistory() {

  const { patientId } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(true);
  const [patient,setPatient] = useState({});
  const [appointments,setAppointments] = useState([]);
  const [prescriptions,setPrescriptions] = useState([]);


  useEffect(()=>{
    fetchMedicalHistory();
  },[]);


  const fetchMedicalHistory = async()=>{

    try{

      const res = await axios.get(
        `https://quickcare-3.onrender.com/api/medical-history/${patientId}`
      );

      setPatient(res.data.patient);
      setAppointments(res.data.appointments || []);
      setPrescriptions(res.data.prescriptions || []);

    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }

  };


  if(loading){
    return(
      <div className="mh-loading">
        Loading Medical History...
      </div>
    )
  }


  return(
  <DoctorLayout>

    <div className="mh-page">

      <div className="mh-header">

        <button
          className="mh-back-btn"
          onClick={()=>navigate(-1)}
        >
          <FaArrowLeft/>
          Back
        </button>

        <div>
          <h1>Medical History</h1>
          <p>Complete Patient Health Record</p>
        </div>

      </div>


      <div className="mh-profile-card">

        <div className="mh-avatar">
          {patient?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="mh-profile-details">

          <h2>{patient?.name}</h2>

          <div className="mh-info-grid">

            <div>
              <FaEnvelope/>
              {patient?.email}
            </div>

            <div>
              <FaPhone/>
              {patient?.phoneNumber}
            </div>

            <div>
              <FaUser/>
              {patient?.gender}
            </div>

            <div>
              Age : {patient?.age}
            </div>

            <div>
              <FaTint/>
              {patient?.bloodGroup || "N/A"}
            </div>

            <div>
              <FaCalendarAlt/>
              Visits : {appointments.length}
            </div>

          </div>

        </div>

      </div>


      <div className="mh-section">

        <div className="mh-section-title">
          <FaCalendarAlt/>
          <h2>Appointment History</h2>
        </div>


        {
          appointments.length===0 ?

          <p>No Appointment History Found</p>

          :

          appointments.map((appointment)=>(

            <div
              className="mh-appointment"
              key={appointment._id}
            >

              <div className="mh-appointment-head">

                <h3>
                  <FaStethoscope/>
                   {appointment.doctorId?.name}
                </h3>

                <span className={`mh-status ${appointment.status?.toLowerCase()}`}>
                  {appointment.status}
                </span>

              </div>


              <div className="mh-appointment-info">

                <p>
                  <b>Date:</b> {appointment.date}
                </p>

                <p>
                  <b>Day:</b> {appointment.day}
                </p>

                <p>
                  <FaClock/>
                  <b>Time:</b> {appointment.time}
                </p>

              </div>

            </div>

          ))
        }

      </div>


      <div className="mh-section">

        <div className="mh-section-title">
          <FaFileMedical/>
          <h2>Prescription History</h2>
        </div>


        {
          prescriptions.map((prescription)=>(

            <div
              className="mh-prescription"
              key={prescription._id}
            >

              <div className="mh-prescription-head">

                <h3>
                  {prescription.doctorId?.name}
                </h3>

                <span>
                  {new Date(prescription.createdAt)
                  .toLocaleDateString()}
                </span>

              </div>


              <p>
                <b>Diagnosis:</b> {prescription.diagnosis}
              </p>

              <p>
                <b>Symptoms:</b> {prescription.symptoms?.join(", ")}
              </p>

              <p>
                <b>Advice:</b> {prescription.advice}
              </p>


              <h4>Medicines</h4>


              <table className="mh-medicine-table">

                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Instruction</th>
                  </tr>
                </thead>


                <tbody>

                {
                  prescription.medicines?.map((medicine,index)=>(

                    <tr key={index}>

                      <td>{medicine.medicine}</td>
                      <td>{medicine.dosage}</td>
                      <td>{medicine.frequency}</td>
                      <td>{medicine.duration}</td>
                      <td>{medicine.instruction}</td>

                    </tr>

                  ))
                }

                </tbody>

              </table>


            </div>

          ))
        }

      </div>


      {
        prescriptions.map((prescription)=>(

          prescription.pdf &&

          <div
            className="mh-report"
            key={prescription._id+"pdf"}
          >

            <h3>Attached Medical Report</h3>

            <a
              href={`https://quickcare-3.onrender.com/${prescription.pdf}`}
              target="_blank"
              rel="noreferrer"
              className="mh-pdf-btn"
            >
              View PDF Report
            </a>

          </div>

        ))
      }


    </div>
    </DoctorLayout>
  )

}

export default MedicalHistory;