import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import { State, City } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PatientSignup() {

  const states = State.getStatesOfCountry("IN");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    bloodGroup: "",
    email: "",
    phoneNumber: "",
    emergencyContact: "",
    state: "",
    stateCode: "",
    city: "",
    address: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
  });

  const cities = formData.stateCode
    ? City.getCitiesOfState("IN", formData.stateCode)
    : [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStateChange = (e) => {
    const selectedState = states.find(
      (state) => state.isoCode === e.target.value
    );

    setFormData({
      ...formData,
      state: selectedState.name,
      stateCode: selectedState.isoCode,
      city: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://quickcare-3.onrender.com/api/patients/signup",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        gender: "",
        age: "",
        bloodGroup: "",
        email: "",
        phoneNumber: "",
        emergencyContact: "",
        state: "",
        stateCode: "",
        city: "",
        address: "",
        pinCode: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="card shadow-lg border-0 rounded-4 p-4">

          <h2 className="text-center mb-4 text-primary">
            Patient Registration
          </h2>

<form onSubmit={handleSubmit}>
          {/* Full Name */}
<div className="mb-3">
  <label className="form-label fw-semibold">Full Name</label>
  <input
    type="text"
    className="form-control"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Enter Full Name"
    required
  />
</div>

{/* Gender */}
<div className="mb-3">
  <label className="form-label fw-semibold">Gender</label>

  <select
    className="form-select"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>

{/* Age */}
<div className="mb-3">
  <label className="form-label fw-semibold">Age</label>

  <input
    type="number"
    className="form-control"
    name="age"
    value={formData.age}
    onChange={handleChange}
    placeholder="Enter Age"
    min="1"
    max="120"
    required
  />
</div>

{/* Blood Group */}
<div className="mb-3">
  <label className="form-label fw-semibold">Blood Group</label>

  <select
    className="form-select"
    name="bloodGroup"
    value={formData.bloodGroup}
    onChange={handleChange}
    required
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
</div>

{/* Email */}
<div className="mb-3">
  <label className="form-label fw-semibold">Email</label>

  <input
    type="email"
    className="form-control"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Enter Email"
    required
  />
</div>

{/* Phone Number */}
<div className="mb-3">
  <label className="form-label fw-semibold">Phone Number</label>

  <input
    type="tel"
    className="form-control"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    placeholder="10 Digit Mobile Number"
    pattern="[0-9]{10}"
    maxLength={10}
    required
  />
</div>

{/* Emergency Contact */}
<div className="mb-3">
  <label className="form-label fw-semibold">
    Emergency Contact
  </label>

  <input
    type="tel"
    className="form-control"
    name="emergencyContact"
    value={formData.emergencyContact}
    onChange={handleChange}
    placeholder="Emergency Contact Number"
    pattern="[0-9]{10}"
    maxLength={10}
    required
  />
</div>

{/* State */}
<div className="mb-3">
  <label className="form-label fw-semibold">State</label>

  <select
    className="form-select"
    value={formData.stateCode}
    onChange={handleStateChange}
    required
  >
    <option value="">Select State</option>

    {states.map((state) => (
      <option key={state.isoCode} value={state.isoCode}>
        {state.name}
      </option>
    ))}
  </select>
</div>

{/* City */}
<div className="mb-3">
  <label className="form-label fw-semibold">City</label>

  <select
    className="form-select"
    name="city"
    value={formData.city}
    onChange={handleChange}
    required
  >
    <option value="">Select City</option>

    {cities.map((city) => (
      <option key={city.name} value={city.name}>
        {city.name}
      </option>
    ))}
  </select>
</div>

{/* Address */}
<div className="mb-3">
  <label className="form-label fw-semibold">Address</label>

  <textarea
    className="form-control"
    rows="3"
    name="address"
    value={formData.address}
    onChange={handleChange}
    placeholder="Enter Full Address"
    required
  ></textarea>
</div>

{/* PIN Code */}
<div className="mb-3">
  <label className="form-label fw-semibold">PIN Code</label>

  <input
    type="text"
    className="form-control"
    name="pinCode"
    value={formData.pinCode}
    onChange={handleChange}
    placeholder="Enter PIN Code"
    pattern="[0-9]{6}"
    maxLength={6}
    required
  />
</div>

{/* Password */}
<div className="mb-3">
  <label className="form-label fw-semibold">Password</label>

  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter Password"
      required
    />

    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>

{/* Confirm Password */}
<div className="mb-4">
  <label className="form-label fw-semibold">
    Confirm Password
  </label>

  <div className="input-group">
    <input
      type={showConfirmPassword ? "text" : "password"}
      className="form-control"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm Password"
      required
    />

    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>
  </div>
</div>

{/* Register Button */}
<button
  type="submit"
  className="btn btn-primary w-100 py-2 fw-bold rounded-3"
>
  Register
</button>

</form>
</div>
</div>

</>
)
}

export default PatientSignup;