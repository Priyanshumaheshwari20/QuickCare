import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAppointment.css";

function ViewAppointment() {

  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Upcoming");

  const patientId = localStorage.getItem("patientId");


  useEffect(() => {

    const fetchAppointments = async () => {
      try {

        const res = await axios.get(
          `http://localhost:5000/api/appointments/patient/${patientId}`
        );

        setAppointments(res.data);

      } catch (error) {
        console.log(error);
      }
    };


    if(patientId){
      fetchAppointments();
    }

  }, [patientId]);



  const upcoming = appointments.filter((item)=> 
    item.status === "Pending" ||
    item.status === "Confirmed"
  );


  const completed = appointments.filter((item)=>
    item.status === "Completed"
  );


  const cancelled = appointments.filter((item)=>
    item.status === "Cancelled"
  );



  const filteredAppointments =
    activeTab === "Upcoming"
      ? upcoming
      : activeTab === "Completed"
      ? completed
      : cancelled;



  return (

    <div className="view-appointment-container">


      <h2>Appointment History</h2>


      <div className="appointment-tabs">

        <button
        className={activeTab==="Upcoming"?"active":""}
        onClick={()=>setActiveTab("Upcoming")}
        >
          Upcoming
        </button>


        <button
        className={activeTab==="Completed"?"active":""}
        onClick={()=>setActiveTab("Completed")}
        >
          Completed
        </button>


        <button
        className={activeTab==="Cancelled"?"active":""}
        onClick={()=>setActiveTab("Cancelled")}
        >
          Cancelled
        </button>


      </div>



      <div className="appointment-list">


      {
        filteredAppointments.length === 0 ? (

          <div className="no-data">
            No {activeTab} Appointments
          </div>

        ) :


        filteredAppointments.map((appointment)=>(


          <div className="appointment-card"
          key={appointment._id}>


            <div>
              <h3>   {appointment.doctorId?.name} </h3>

              <p>
                🏥 {appointment.doctorId?.hospital}
              </p>

              <p>
                📅 {appointment.date}
              </p>

              <p>
                ⏰ {appointment.time}
              </p>

            </div>


            <div className="status-section">

              <span className={
                appointment.status.toLowerCase()
              }>
                {appointment.status}
              </span>


              {
                activeTab==="Upcoming" &&
                appointment.status !== "Cancelled" &&
                (
                  <button className="join-btn">
                    Join Call
                  </button>
                )
              }


              {
                activeTab==="Completed" &&
                (
                  <button className="prescription-btn">
                    View Prescription
                  </button>
                )
              }


            </div>



          </div>


        ))

      }


      </div>


    </div>

  );
}


export default ViewAppointment;