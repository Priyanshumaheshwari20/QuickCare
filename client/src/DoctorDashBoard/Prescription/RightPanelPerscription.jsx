import React from "react";

function RightPanel({
  appointment,
  pdfFile,
  setPdfFile,
  handleUploadPDF,
}) {
  return (
    <div className="right-panel">

      {/* Patient Information */}
      <div className="info-card">

        <h3>Patient Information</h3>

        <h4>{appointment?.patientId?.name}</h4>

        <p>
          <strong>Age :</strong> {appointment?.patientId?.age}
        </p>

        <p>
          <strong>Gender :</strong> {appointment?.patientId?.gender}
        </p>

        <p>
          <strong>Blood Group :</strong>{" "}
          {appointment?.patientId?.bloodGroup || "N/A"}
        </p>

        <p>
          <strong>Phone :</strong>{" "}
          {appointment?.patientId?.phoneNumber}
        </p>

        <p>
          <strong>Email :</strong>{" "}
          {appointment?.patientId?.email}
        </p>

        <p>
          <strong>Emergency Contact :</strong>{" "}
          {appointment?.patientId?.emergencyContact || "N/A"}
        </p>

      </div>

      {/* General Information */}

      <div className="info-card">

        <h3>General Information</h3>

        <p>
          <strong>State :</strong>{" "}
          {appointment?.patientId?.state || "N/A"}
        </p>

        <p>
          <strong>City :</strong>{" "}
          {appointment?.patientId?.city || "N/A"}
        </p>

        <p>
          <strong>Address :</strong>{" "}
          {appointment?.patientId?.address || "N/A"}
        </p>

        <p>
          <strong>Pincode :</strong>{" "}
          {appointment?.patientId?.pinCode || "N/A"}
        </p>

        <p>
          <strong>Height :</strong>{" "}
          {appointment?.patientId?.height || "N/A"}
        </p>

        <p>
          <strong>Weight :</strong>{" "}
          {appointment?.patientId?.weight || "N/A"}
        </p>

      </div>

      {/* Medical Report */}

      <div className="info-card">

        <h3>Medical Report</h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        <button
          className="upload-btn"
          onClick={handleUploadPDF}
        >
          Upload Report
        </button>

      </div>

      {/* Consultation */}

      <div className="info-card video-card">

        <h3>Consultation</h3>

        <span className="video-tag">
          Video Call
        </span>

        <button className="start-call-btn">
          Start Video Call
        </button>

      </div>

    </div>
  );
}

export default RightPanel;