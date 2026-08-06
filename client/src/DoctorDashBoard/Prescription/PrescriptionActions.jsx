import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrescriptionPage.css";

function PrescriptionActions({ handleSavePrescription }) {
  const navigate = useNavigate();

  return (
    <div className="prescription-actions">

      <button
        className="save-btn"
        onClick={handleSavePrescription}
      >
        Save Prescription
      </button>

      <button
        className="cancel-btn"  style={{width:"150px"}}
        onClick={() => navigate("/DoctorDashboard")}
      >
        Cancel
      </button>

    </div>
  );
}

export default PrescriptionActions;