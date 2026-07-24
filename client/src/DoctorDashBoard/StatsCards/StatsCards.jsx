import React,{useEffect,useState} from "react";
import axios from "axios";

function StatsCards(){

 const [totalAppointments,setTotalAppointments] = useState(0);


 useEffect(()=>{

   const fetchCount = async()=>{

    const doctorId = localStorage.getItem("doctorId");


    const response = await axios.get(
     `http://localhost:5000/api/appointments/count/${doctorId}`
    );


    setTotalAppointments(
      response.data.totalAppointments
    );

   }


   fetchCount();

 },[]);



 return(
   <div>

    <h2>
      {totalAppointments}
    </h2>

    <p>
      Total Appointments
    </p>

   </div>
 )

}

export default StatsCards;