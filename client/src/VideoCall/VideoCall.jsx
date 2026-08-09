import React,{useEffect,useRef,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";

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



function VideoCall(){

const {appointmentId}=useParams();
const navigate=useNavigate();


const [seconds,setSeconds]=useState(0);

const [micOn,setMicOn]=useState(true);
const [cameraOn,setCameraOn]=useState(true);



const localRef=useRef(null);
const remoteRef=useRef(null);



const client=useRef(

AgoraRTC.createClient({

mode:"rtc",
codec:"vp8"

})

);



const localAudioTrack=useRef(null);
const localVideoTrack=useRef(null);



useEffect(()=>{


let timer;



const joinCall=async()=>{


try{


const response=await axios.get(

`http://localhost:5000/api/video/token/${appointmentId}`

);



const {
token,
appID,
channelName,
uid

}=response.data;



await client.current.join(

appID,
channelName,
token,
uid

);



client.current.on(

"user-published",

async(user,mediaType)=>{


await client.current.subscribe(

user,
mediaType

);



if(mediaType==="video"){

user.videoTrack.play(
remoteRef.current
);

}



if(mediaType==="audio"){

user.audioTrack.play();

}


}

);



const tracks =
await AgoraRTC.createMicrophoneAndCameraTracks();



localAudioTrack.current=tracks[0];

localVideoTrack.current=tracks[1];



localVideoTrack.current.play(

localRef.current

);



await client.current.publish(

tracks

);



timer=setInterval(()=>{


setSeconds(prev=>prev+1);


},1000);



}

catch(error){

console.log(
"Agora Error",
error
);

}


};



joinCall();



return()=>{


clearInterval(timer);



if(localAudioTrack.current){

localAudioTrack.current.stop();
localAudioTrack.current.close();

}



if(localVideoTrack.current){

localVideoTrack.current.stop();
localVideoTrack.current.close();

}



client.current.leave();


};



},[appointmentId]);





const formatTime=()=>{


const mins=Math.floor(seconds/60);

const secs=seconds%60;


return (

`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`

);


};






const toggleMic=async()=>{


if(!localAudioTrack.current)
return;



await localAudioTrack.current.setEnabled(
!micOn
);


setMicOn(!micOn);


};





const toggleCamera=async()=>{


if(!localVideoTrack.current)
return;



await localVideoTrack.current.setEnabled(
!cameraOn
);


setCameraOn(!cameraOn);


};





const leaveCall=async()=>{


if(localAudioTrack.current){

localAudioTrack.current.stop();

localAudioTrack.current.close();

}



if(localVideoTrack.current){

localVideoTrack.current.stop();

localVideoTrack.current.close();

}



await client.current.leave();


navigate("/");


};






return(


<div className="qc-video-call-container">



<div className="qc-video-call-header">


<h2>
Video Consultation
</h2>


<p>
Appointment ID : {appointmentId}
</p>


<div className="qc-video-call-status">

🟢 Connected

<span>
{formatTime()}
</span>


</div>



</div>





<div className="qc-consultation-layout">



<div className="qc-video-section">



<div className="qc-video-wrapper">



<div className="qc-video-card">


<div

className="qc-video-box"

ref={remoteRef}

></div>


<div className="qc-video-label">

{
localStorage.getItem("role")==="doctor"
?
"Patient"
:
"Doctor"
}

</div>


</div>





<div className="qc-video-card qc-local-video">


<div

className="qc-video-box"

ref={localRef}

></div>


<div className="qc-video-label">

{
localStorage.getItem("role")==="doctor"
?
"Doctor"
:
"Patient"
}

</div>


</div>



</div>



</div>






</div>






<div className="qc-video-controls">



<button

className={
micOn
?
"qc-video-call-control-btn"
:
"qc-video-call-control-btn qc-video-call-control-off"
}

onClick={toggleMic}

>


{
micOn
?
<FaMicrophone/>
:
<FaMicrophoneSlash/>
}


</button>






<button

className={
cameraOn
?
"qc-video-call-control-btn"
:
"qc-video-call-control-btn qc-video-call-control-off"
}

onClick={toggleCamera}

>


{
cameraOn
?
<HiVideoCamera/>
:
<HiVideoCameraSlash/>
}


</button>






<button

className="qc-video-call-end-btn"

onClick={leaveCall}

>


<FaPhoneSlash/>


</button>




</div>




</div>


);


}


export default VideoCall;