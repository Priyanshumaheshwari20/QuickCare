import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CallingScreen.css";
import socket from "../Socket/socket";
import callingRingtone from "../Ringtone/callingRingtone.mp3"
function CallingScreen() {

  const navigate = useNavigate();
const callingTone = new Audio(callingRingtone);
callingTone.loop = true;
  const { appointmentId } = useParams();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    callingTone.play().catch((err) => {
  console.log(err);
});

    const doctorId = localStorage.getItem("doctorId");

    socket.on("call-accepted", () => {


       callingTone.pause();
  callingTone.currentTime = 0;

      navigate(`/video/${appointmentId}`);

    });

    const timer = setInterval(() => {

      setSeconds((prev) => prev + 1);

    }, 1000);

    return () => {

      callingTone.pause();
  callingTone.currentTime = 0;

      clearInterval(timer);

      socket.off("call-accepted");

    };

  }, [appointmentId, navigate]);

  return (

    <div className="calling-container">

      <div className="calling-card">

        <div className="avatar">

          👨‍⚕️

        </div>

        <h2>Calling Patient...</h2>

        <p>Please wait while patient joins</p>

        <div className="dots">

          <span></span>
          <span></span>
          <span></span>

        </div>

        <div className="timer">

          00:{seconds < 10 ? `0${seconds}` : seconds}

        </div>

        <button
          className="cancel-btn"
          onClick={() => navigate("/DoctorDashboard")}
        >
          End Call
        </button>

      </div>

    </div>

  );

}

export default CallingScreen;