import express from "express";

import {
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    cancelAppointment,
    getAppointmentCount,
    getAppointmentById,
} from "../controllers/AppointmentControllers.js";

const router = express.Router();

// Book Appointment
router.post("/", createAppointment);

// Get Patient Appointments
router.get("/patient/:patientId", getPatientAppointments);

// Get Doctor Appointments
router.get("/doctor/:doctorId", getDoctorAppointments);

// Get Appointment Count
router.get("/count/:doctorId", getAppointmentCount);

// Get Single Appointment
router.get("/:appointmentId", getAppointmentById);

// Delete Appointment
router.delete("/:id", cancelAppointment);

export default router;