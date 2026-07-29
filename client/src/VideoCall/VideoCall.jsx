import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VideoCall.css";

import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import {
    FaMicrophone,
    FaMicrophoneSlash,
    FaPhoneSlash
} from "react-icons/fa";

import {
    HiVideoCamera,
    HiVideoCameraSlash
} from "react-icons/hi2";
function VideoCall() {

  const { appointmentId } = useParams();
  const navigate = useNavigate();
const [seconds, setSeconds] = useState(0);

  const localRef = useRef(null);
  const remoteRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const client = useRef(
    AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    })
  );

  const localAudioTrack = useRef(null);
  const localVideoTrack = useRef(null);

 useEffect(() => {

  let timer;

  const joinCall = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/video/token/${appointmentId}`
      );

      const {
        token,
        appID,
        channelName,
        uid,
      } = response.data;

      console.log("APP ID:", appID);
      console.log("CHANNEL:", channelName);
      console.log("UID:", uid);

      await client.current.join(
        appID,
        channelName,
        token,
        uid
      );

      console.log("Joined Agora");

      client.current.on(
        "user-published",
        async (user, mediaType) => {

          await client.current.subscribe(user, mediaType);

          if (mediaType === "video") {
            user.videoTrack.play(remoteRef.current);
          }

          if (mediaType === "audio") {
            user.audioTrack.play();
          }

        }
      );

      const tracks =
        await AgoraRTC.createMicrophoneAndCameraTracks();

      localAudioTrack.current = tracks[0];
      localVideoTrack.current = tracks[1];

      localVideoTrack.current.play(localRef.current);

      await client.current.publish(tracks);

      console.log("Published");

      // Timer Start
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

    } catch (error) {

      console.log("Agora Error:", error);

    }

  };

  joinCall();

  return () => {

    clearInterval(timer);

    if (localAudioTrack.current) {
      localAudioTrack.current.stop();
      localAudioTrack.current.close();
    }

    if (localVideoTrack.current) {
      localVideoTrack.current.stop();
      localVideoTrack.current.close();
    }

    client.current.leave();

  };

}, [appointmentId]);

const formatTime = (totalSeconds) => {

  const hrs = Math.floor(totalSeconds / 3600);

  const mins = Math.floor((totalSeconds % 3600) / 60);

  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

};

  const toggleMic = async () => {

    if (!localAudioTrack.current) return;

    await localAudioTrack.current.setEnabled(!micOn);

    setMicOn(!micOn);

  };

  const toggleCamera = async () => {

    if (!localVideoTrack.current) return;

    await localVideoTrack.current.setEnabled(!cameraOn);

    setCameraOn(!cameraOn);

  };

  const leaveCall = async () => {

    if (localAudioTrack.current) {
      localAudioTrack.current.stop();
      localAudioTrack.current.close();
    }

    if (localVideoTrack.current) {
      localVideoTrack.current.stop();
      localVideoTrack.current.close();
    }

    await client.current.leave();

    navigate("/");

  };

  return (

    <div className="video-container">

      <div className="call-header">

        <div>

          <h1>Video Consultation</h1>

          <p>
            Appointment ID :
            <span>{appointmentId}</span>
          </p>

        </div>

        <div className="status">
          <span></span>
          Connected
        </div>


<div className="status">
    <span></span>

    <div>
        <p>Connected</p>
        <small>{formatTime(seconds)}</small>
    </div>
</div>
      </div>

      <div className="video-wrapper">

        {/* Remote Video */}

        <div className="video-card">

          <div
            className="video-box"
            ref={remoteRef}
          ></div>

          <div className="user-label">
            {localStorage.getItem("role") === "doctor"
              ? "Patient"
              : "Doctor"}
          </div>

        </div>

        {/* Local Video */}

        <div className="video-card local-video">

          <div
            className="video-box"
            ref={localRef}
          ></div>

          <div className="user-label">
            {localStorage.getItem("role") === "doctor"
              ? "Doctor"
              : "Patient"}
          </div>

        </div>

      </div>

   <div className="controls">

    <button
        className={micOn ? "control-btn" : "control-btn off"}
        onClick={toggleMic}
    >
        {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
    </button>

    <button
        className={cameraOn ? "control-btn" : "control-btn off"}
        onClick={toggleCamera}
    >
        {cameraOn ? <HiVideoCamera /> : <HiVideoCameraSlash />}
    </button>

    <button
        className="leave-btn"
        onClick={leaveCall}
    >
        <FaPhoneSlash />
    </button>

</div>
    </div>

  );

}

export default VideoCall;