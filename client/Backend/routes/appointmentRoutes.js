import express from "express";

import {
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    deleteAppointment,
    permanentDeleteAppointment,
    getAppointmentCount,
    getUniquePatientCount,
    updateAppointmentStatus,
} from "../controllers/AppointmentControllers.js";

const router = express.Router();

// Create Appointment
router.post("/", createAppointment);

// Patient Appointments
router.get("/patient/:patientId", getPatientAppointments);

// Doctor Appointments
router.get("/doctor/:doctorId", getDoctorAppointments);

// Dashboard Counts
router.get("/count/:doctorId", getAppointmentCount);
router.get("/patients/count/:doctorId", getUniquePatientCount);

// Update Appointment Status
router.put("/status/:appointmentId", updateAppointmentStatus);
router.patch("/status/:appointmentId", updateAppointmentStatus);

// Permanent Delete (Doctor)
router.delete("/permanent/:id", permanentDeleteAppointment);

// Cancel Appointment (Patient)
router.delete("/:id", deleteAppointment);

export default router;