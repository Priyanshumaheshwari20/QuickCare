import express from "express";

import {
    createPrescription,
    getPrescription,
    updatePrescription,
    deletePrescription,
    getPatientPrescriptions
} from "../controllers/PrescriptionControllers.js";

const router = express.Router();


// Create
router.post("/", createPrescription);


// Patient prescriptions  ✅ PEHLE
router.get(
    "/patient/:patientId",
    getPatientPrescriptions
);


// Appointment prescription
router.get(
    "/appointment/:appointmentId",
    getPrescription
);


// Update
router.put("/:id", updatePrescription);


// Delete
router.delete("/:id", deletePrescription);


export default router;