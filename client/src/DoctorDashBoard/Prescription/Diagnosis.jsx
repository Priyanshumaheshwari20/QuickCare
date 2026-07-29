import React from "react";

function Diagnosis({ diagnosis, setDiagnosis }) {
  return (
    <div className="card">

      <h3>Diagnosis</h3>

      <textarea
        placeholder="Enter diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

    </div>
  );
}

export default Diagnosis;