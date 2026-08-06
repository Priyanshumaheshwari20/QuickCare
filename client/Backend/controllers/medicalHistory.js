import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";

export const getMedicalHistory = async(req, res) => {
    try {

        const { patientId } = req.params;

        // Patient Details
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        // All Appointments
        const appointments = await Appointment.find({
                patientId,
            })
            .populate("doctorId")
            .sort({ createdAt: -1 });

        // All Prescriptions
        const prescriptions = await Prescription.find({
                patientId,
            })
            .populate("doctorId")
            .populate("appointmentId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            patient,
            appointments,
            prescriptions,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};