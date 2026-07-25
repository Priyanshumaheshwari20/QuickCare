import React,{useState, useEffect} from "react";
import "./AppointmentTable.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppointmentTable() {
const navigate = useNavigate();
const [appointments,setAppointments] = useState([]);


const doctorId = localStorage.getItem("doctorId");

console.log("Doctor ID:", doctorId);
useEffect(()=>{

 const fetchAppointments = async()=>{

  try{

    const response = await axios.get(
      `http://localhost:5000/api/appointments/doctor/${doctorId}`
    );


    setAppointments(response.data.appointments);
}
catch(error){
console.log(error);
 }}
fetchAppointments();
},[doctorId]);
  return (
    <div className="appointment-table-card">
          <div className="table-header">
        <h4>Today's Appointments</h4>

        <button className="btn btn-primary">
          View All
        </button>
      </div>

      <table className="table table-hover align-middle">

        <thead>

          <tr>
            <th>Patient</th>
            <th>Age</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {appointments.map((item) => (

            <tr key={item._id}>

<td>
{
  item.patientId
  ? item.patientId.name
  : "Patient Not Available"
}
</td>

<td>
{
  item.patientId
  ? item.patientId.age
  : "-"
}
</td>

<td>
{item.time}
</td>

<td>
<span
className={`status-badge ${item.status.toLowerCase()}`}
>
{item.status}
</span>
</td>

<td>
<button 
onClick={() =>
 navigate("/prescription", {
   state:{
    appointment:item
   }
 })
}
>
View
</button>
</td>

</tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AppointmentTable;