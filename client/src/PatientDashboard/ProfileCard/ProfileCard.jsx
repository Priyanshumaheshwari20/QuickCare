import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import "./ProfileCard.css";

function ProfileCard() {
  const [patient, setPatient] = useState({});
  const [editMode, setEditMode] = useState(false);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patients/${patientId}`
      );

      setPatient(res.data.patient);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load profile");
    }
  };

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/patients/${patientId}`,
        patient
      );

      setPatient(res.data.patient);

      localStorage.setItem(
        "patientName",
        res.data.patient.name
      );

      setEditMode(false);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            <FaUserCircle />
          </div>

          <div className="profile-heading">
            <h2>{patient.name || "Patient Profile"}</h2>
            <p>QuickCare Healthcare Member</p>
          </div>

          <div className="profile-actions">

            {editMode ? (
              <>
                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  <FaSave />
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  <FaTimes />
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                <FaUserEdit />
                Edit Profile
              </button>
            )}

          </div>

        </div>

        <div className="profile-body">

          <div className="field">
            <label>Full Name</label>
            <input
              name="name"
              value={patient.name || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              name="email"
              value={patient.email || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={patient.age || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Gender</label>
            <input
              name="gender"
              value={patient.gender || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Blood Group</label>
            <input
              name="bloodGroup"
              value={patient.bloodGroup || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              value={patient.phoneNumber || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>Emergency Contact</label>
            <input
              name="emergencyContact"
              value={patient.emergencyContact || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>State</label>
            <input
              name="state"
              value={patient.state || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>City</label>
            <input
              name="city"
              value={patient.city || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field full-width">
            <label>Address</label>
            <textarea
              rows="3"
              name="address"
              value={patient.address || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="field">
            <label>PIN Code</label>
            <input
              name="pinCode"
              value={patient.pinCode || ""}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfileCard;