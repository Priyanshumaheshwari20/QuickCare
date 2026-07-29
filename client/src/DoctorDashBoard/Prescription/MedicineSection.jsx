import React from "react";

function MedicineSection({
  medicines,
  addMedicine,
  removeMedicine,
  handleMedicineChange,
}) {
  return (
    <div className="card medicine-card">

      <div className="medicine-header">

        <h3>Prescription Medicine</h3>

        <button
          className="add-medicine-btn"
          onClick={addMedicine}
        >
          + Add Medicine
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Instruction</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {medicines.map((item, index) => (

            <tr key={index}>

              <td>
                <input
                  type="text"
                  value={item.medicine}
                  placeholder="Medicine Name"
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "medicine",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={item.dosage}
                  placeholder="500mg"
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "dosage",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={item.frequency}
                  placeholder="2 times/day"
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "frequency",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={item.duration}
                  placeholder="5 days"
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={item.instruction}
                  placeholder="After meal"
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "instruction",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => removeMedicine(index)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MedicineSection;