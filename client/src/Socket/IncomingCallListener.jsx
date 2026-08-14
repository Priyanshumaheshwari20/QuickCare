import React,{useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

import socket from "./socket";
import receiveRingtone from "../Ringtone/recivedRingtone.mp3";

function IncomingCallListener(){

const navigate=useNavigate();

const receiveTone=useRef(
new Audio(receiveRingtone)
);


useEffect(()=>{

receiveTone.current.loop=true;

const patientId=localStorage.getItem("patientId");

if(patientId){
socket.emit("register",patientId);
}


const handleIncomingCall=({doctorId,appointmentId})=>{


receiveTone.current.play()
.catch(err=>console.log(err));


toast.info(

<div>

<h4 style={{margin:0}}>
📞 Incoming Video Call
</h4>


<p>
Doctor is calling you...
</p>


<div style={{
display:"flex",
gap:"10px"
}}>


<button
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"8px 18px",
borderRadius:"8px"
}}

onClick={async()=>{


receiveTone.current.pause();
receiveTone.current.currentTime=0;


await axios.put(
`https://quickcare-3.onrender.com/api/appointments/status/${appointmentId}`,
{
status:"In Progress"
}
);


socket.emit("accept-call",{
doctorId,
patientId,
appointmentId
});


toast.dismiss();

navigate(`/video/${appointmentId}`);


}}
>
Accept
</button>



<button

style={{
background:"#ef4444",
color:"white",
border:"none",
padding:"8px 18px",
borderRadius:"8px"
}}

onClick={()=>{


receiveTone.current.pause();
receiveTone.current.currentTime=0;


toast.dismiss();


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
icon:false
}

);


};


socket.on(
"incoming-call",
handleIncomingCall
);



return()=>{


socket.off(
"incoming-call",
handleIncomingCall
);


receiveTone.current.pause();

};


},[navigate]);


return null;

}


export default IncomingCallListener;