import React from "react";
import { useNavigate } from "react-router-dom";

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
        className="cancel-btn"
        onClick={() => navigate("/DoctorDashboard")}
      >
        Cancel
      </button>

    </div>
  );
}

export default PrescriptionActions;