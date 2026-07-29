import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientSidebar from "./PatientSidebar/PatientSidebar";
import Header from "./Header/Header";
import StatsCards from "./StatsCards/StatsCards";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import PrescriptionList from "./PrescriptionList/PrescriptionList";
import ProfileCard from "./ProfileCard/ProfileCard";

import socket from "../Socket/socket";
import { toast } from "react-toastify";

import "./PatientDashboard.css";
  import receiveRingtone from "../Ringtone/recivedRingtone.mp3";

function PatientDashboard() {

  const navigate = useNavigate();

  const receiveTone = useRef(
    new Audio(receiveRingtone)
  );


  useEffect(() => {

    receiveTone.current.loop = true;

    const patientId = localStorage.getItem("patientId");


    if (patientId) {
      socket.emit("register", patientId);
    }


    socket.on("incoming-call", ({ doctorId, appointmentId }) => {


      receiveTone.current.play()
        .catch((err) => console.log(err));


      toast.info(
        <div>

          <h4 style={{margin:0}}>
            📞 Incoming Video Call
          </h4>


          <p style={{margin:"8px 0"}}>
            Doctor is calling you...
          </p>


          <div
            style={{
              display:"flex",
              gap:"10px",
              marginTop:"10px"
            }}
          >


            <button   onClick={async() => {
                 // stop ringtone
                receiveTone.current.pause();
                receiveTone.current.currentTime = 0;
await axios.put(
      `http://localhost:5000/api/appointments/status/${appointmentId}`,
      {
        status: "In Progress"
      }
    );
console.log("Call accepted:", appointmentId);
                socket.emit("accept-call", {

                  doctorId,
                  patientId,
                  appointmentId,
                });


                toast.dismiss();


                navigate(`/video/${appointmentId}`);

              }}

              style={{
                background:"#16a34a",
                color:"#fff",
                border:"none",
                padding:"8px 18px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Accept
            </button>



            <button
              onClick={() => {


                // stop ringtone
                receiveTone.current.pause();
                receiveTone.current.currentTime = 0;


                socket.emit("decline-call", {
                  doctorId,
                  appointmentId
                });


                toast.dismiss();


              }}

              style={{
                background:"#ef4444",
                color:"#fff",
                border:"none",
                padding:"8px 18px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Decline
            </button>


          </div>


        </div>,


        {
          autoClose:false,
          closeOnClick:false,
          draggable:false,
          position:"top-right",
          icon:false,
        }

      );


    });



    return () => {

      receiveTone.current.pause();
      receiveTone.current.currentTime = 0;

      socket.off("incoming-call");

    };


  }, [navigate]);




  return (

    <div className="patient-dashboard">

      <PatientSidebar />

      <div className="patient-main">

        <Header />

        <StatsCards />


        <div className="patient-grid">

          <div className="left-section">

            <AppointmentTable />

            <PrescriptionList />

          </div>


          <div className="right-section">

            <ProfileCard />

          </div>


        </div>


      </div>


    </div>

  );

}


export default PatientDashboard;