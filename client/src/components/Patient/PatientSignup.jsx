import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
function PatientSignup() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    phoneNumber: "",
    place: "",
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
        "http://localhost:5000/api/patients/signup",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        gender: "",
        age: "",
        email: "",
        phoneNumber: "",
        place: "",
        password: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>

    <Navbar/>
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">
          Patient Registration
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name}
              onChange={handleChange} required/>
          </div>

          <div className="mb-3">
            <label>Gender</label>

            <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}   required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

          <div className="mb-3">
            <label>Age</label>

            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>

            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Place</label>

            <input
              type="text"
              className="form-control"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Register
          </button>

        </form>
      </div>
    </div>

    </>
  );
}

export default PatientSignup;