import express from "express";

import {
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    cancelAppointment,
    getAppointmentCount,
    getAppointmentById,
    getPatientCount,
    updateAppointmentStatus
} from "../controllers/AppointmentControllers.js";

const router = express.Router();

router.post("/", createAppointment);

router.get("/patient/:patientId", getPatientAppointments);

router.get("/doctor/:doctorId", getDoctorAppointments);

router.get("/count/:doctorId", getAppointmentCount);

// 👇 Isko yahan rakho
router.get("/patients/count/:doctorId", getPatientCount);
router.put("/status/:appointmentId", updateAppointmentStatus);

// 👇 Generic route hamesha last me
router.get("/:appointmentId", getAppointmentById);

router.delete("/:id", cancelAppointment);

export default router;