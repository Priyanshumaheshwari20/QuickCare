import React from "react";
import "./PrescriptionPage.css";

function AdviceSection({ advice, setAdvice }) {
  return (
    <div className="card">

      <h3>Doctor Advice / Instruction</h3>

      <textarea
        placeholder="Write advice"
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
      />

    </div>
  );
}

export default AdviceSection;