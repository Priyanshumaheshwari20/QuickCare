import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function DoctorLogin({ changeRole }) {
  const navigate =useNavigate()
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
        "http://localhost:5000/api/doctors/login",
        formData
      );

      console.log(response.data);

      // Save Doctor Details
      localStorage.setItem(
        "doctorId",
        response.data.doctor._id
      );

      localStorage.setItem(
        "doctorName",
        response.data.doctor.name
      );

      localStorage.setItem(
        "role",
        "doctor"
      );

     Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: "Welcome Doctor!",
  timer: 2000,
  showConfirmButton: false,
}).then(() => {
  navigate("/");
});
    } catch (error) {

      console.log(error);

      
      
      Swal.fire({
  icon: "error",
  title: "Login Failed",
  text:
    error.response?.data?.message ||
    "Invalid Email or Password",
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
                Doctor Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>


<p className="text-center mt-3">
  Patient Login?
  <span
    onClick={changeRole}
    style={{ color: "blue", cursor: "pointer" }}
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

export default DoctorLogin;