import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function PatientLogin({ changeRole }) {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

    const response = await axios.post(
  "http://localhost:5000/api/patients/login",
  formData
);

      console.log(response.data);



      localStorage.setItem(
        "patientId",
        response.data.patient._id
      );


      localStorage.setItem(
        "patientName",
        response.data.patient.name
      );


      localStorage.setItem(
        "role",
        "patient"
      );



      Swal.fire({

        icon: "success",

        title: "Login Successful",

        text: `Welcome ${response.data.patient.name}`,

        timer: 2000,

        showConfirmButton:false

      }).then(()=>{

        navigate("/");

      });



    } catch(error){


      console.log(error);


      Swal.fire({

        icon:"error",

        title:"Login Failed",

        text:
        error.response?.data?.message ||
        "Invalid Email"

      });


    }

  };





return (

<>


<div className="container mt-5">


<div className="row justify-content-center">


<div className="col-md-5">


<div className="card shadow p-4">


<h2 className="text-center mb-4">
Patient Login
</h2>



<form onSubmit={handleSubmit}>


{/* Email */}

<div className="mb-3">


<label className="form-label">
Email
</label>


<input type="email" className="form-control"placeholder="Enter Email"name="email"

value={formData.email}onChange={handleChange}required/>


</div>
{/* Password UI only */}

<div className="mb-3">
<label className="form-label">
Password
</label>


<input  type="password"  className="form-control"  placeholder="Enter Password"  name="password"

value={formData.password}

onChange={handleChange}

/>


</div>





<button

type="submit"

className="btn btn-primary w-100"

>

Login

</button>





<p className="text-center mt-3">

Doctor Login?{" "}

<span

onClick={changeRole}

style={{

color:"blue",

cursor:"pointer",

textDecoration:"underline",

fontWeight:"600"

}}

>

Click here

</span>


</p>



</form>



</div>


</div>


</div>


</div>



</>

);


}


export default PatientLogin;