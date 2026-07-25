import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileCard.css";


function ProfileCard() {

  const [patient, setPatient] = useState({});


  useEffect(() => {

    const getPatient = async () => {

      try {

        const id = localStorage.getItem("patientId");

        const res = await axios.get(
          `http://localhost:5000/api/patients/${id}`
        );


        setPatient(res.data.patient);


      } catch (error) {

        console.log(error);

      }

    };


    getPatient();


  }, []);



  return (

    <div className="profile-card">


      <div className="profile-top">

        <div className="avatar">
          👤
        </div>


        <div>
          <h3>
            {patient.name || "Patient Profile"}
          </h3>

          <p>
            Healthcare Member
          </p>
        </div>


      </div>




      <div className="profile-info">


        <p>
          Name :
          <span>
            {patient.name}
          </span>
        </p>



        <p>
          Age :
          <span>
            {patient.age} Years
          </span>
        </p>



        <p>
          Gender :
          <span>
            {patient.gender}
          </span>
        </p>



        <p>
          Blood Group :
          <span>
            {patient.bloodGroup}
          </span>
        </p>



        <p>
          Phone :
          <span>
            {patient.phoneNumber}
          </span>
        </p>



        <p>
          Email :
          <span>
            {patient.email}
          </span>
        </p>



        <p>
          Emergency Contact :
          <span>
            {patient.emergencyContact}
          </span>
        </p>



        <p>
          State :
          <span>
            {patient.state}
          </span>
        </p>



        <p>
          City :
          <span>
            {patient.city}
          </span>
        </p>



        <p>
          Address :
          <span>
            {patient.address}
          </span>
        </p>



        <p>
          PIN Code :
          <span>
            {patient.pinCode}
          </span>
        </p>



      </div>



    </div>

  );


}


export default ProfileCard;