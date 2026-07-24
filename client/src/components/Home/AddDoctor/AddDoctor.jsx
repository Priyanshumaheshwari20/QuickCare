import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";
function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    qualification: "",
    experience: "",
    hospital: "",
    consultationFee: "",
    about: "",
    image: "",
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
        "http://localhost:5000/api/doctors/signup",
        formData
      );

      alert("Doctor Registered Successfully ✅");
      console.log(response.data);

      setFormData({ name: "", email: "", password: "", specialization: "",
        qualification: "",
        experience: "",
        hospital: "",
        consultationFee: "",
        about: "",
      });

    } catch (error) {
      console.log(error);
      alert("Registration Failed ❌");
    }
  };

  return (
<>
    <Navbar/>
    <div className="container mt-5 mb-5  ">

      <h1 className="text-center mb-4">
        Doctor Registration
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center "
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center "
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="text"
          name="hospital"
          placeholder="Hospital Name"
          value={formData.hospital}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3 w-25 d-flex justify-content-center"
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.consultationFee}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3 w-25 d-flex justify-content-center"
          rows="4"
          name="about"
          placeholder="About Yourself"
          value={formData.about}
          onChange={handleChange}
          required
        ></textarea>

        {/* <input
          className="form-control mb-4"
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        /> */}

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>

      </form>

    </div>
<Footer/>
    </>
  );
}

export default DoctorSignup;