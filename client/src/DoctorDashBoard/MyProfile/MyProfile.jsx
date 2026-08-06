import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorLayout from "../DoctorLayout/DoctorLayout";
import "./MyProfile.css";

function MyProfile() {
  const [doctor, setDoctor] = useState({});
  const [editMode, setEditMode] = useState(false);

  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctors/${doctorId}`
      );

      setDoctor(res.data.doctor);

      localStorage.setItem(
        "doctorName",
        res.data.doctor.name
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/doctors/${doctorId}`,
        doctor
      );

      setDoctor(res.data.doctor);

      localStorage.setItem(
        "doctorName",
        res.data.doctor.name
      );

      window.dispatchEvent(
        new Event("doctorUpdated")
      );

      setEditMode(false);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <DoctorLayout>

      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-top">

            <h2>
              Welcome, {doctor.name}
            </h2>

            {editMode ? (
              <>
                <button onClick={handleSave}>
                  Save
                </button>

                <button
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}

          </div>

          <div className="profile-user">

            <div className="profile-avatar">
              👨‍⚕️
            </div>

            <h3>{doctor.name}</h3>

          </div>

          <div className="profile-form">

            <div className="field">
              <label>Full Name</label>
              <input
                name="name"
                value={doctor.name || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="email"
                value={doctor.email || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Specialization</label>
              <input
                name="specialization"
                value={doctor.specialization || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Qualification</label>
              <input
                name="qualification"
                value={doctor.qualification || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={doctor.experience || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Hospital</label>
              <input
                name="hospital"
                value={doctor.hospital || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>Consultation Fee</label>
              <input
                type="number"
                name="consultationFee"
                value={doctor.consultationFee || ""}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>

            <div className="field">
              <label>About</label>
              <textarea
                name="about"
                value={doctor.about || ""}
                onChange={handleChange}
                readOnly={!editMode}
                rows="5"
              />
            </div>

          </div>

        </div>

      </div>

    </DoctorLayout>
  );
}

export default MyProfile;