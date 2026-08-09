import Document from "../models/Document.js";
import Appointment from "../models/Appointment.js";
import { io } from "../server.js";

// ============================
// Upload Document
// ============================
export const uploadDocument = async(req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "PDF not found",
            });

        }

        const { appointmentId } = req.body;

        if (!appointmentId) {

            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });

        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {

            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });

        }

        const document = await Document.create({

            appointmentId: appointment._id,

            patientId: appointment.patientId,

            doctorId: appointment.doctorId,

            fileName: req.file.filename,

            filePath: req.file.path,

        });

        // ============================
        // LIVE UPDATE
        // ============================

        io.to(appointment.patientId.toString()).emit(
            "document-uploaded", {
                appointmentId: appointment._id.toString(),
                document,
            }
        );

        io.to(appointment.doctorId.toString()).emit(
            "document-uploaded", {
                appointmentId: appointment._id.toString(),
                document,
            }
        );

        return res.status(201).json({

            success: true,

            message: "PDF Uploaded Successfully",

            document,

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================
// Get Documents By Appointment
// ============================
export const getDocuments = async(req, res) => {

    try {

        const { appointmentId } = req.params;

        const documents = await Document.find({

            appointmentId,

        }).sort({

            createdAt: -1,

        });

        return res.status(200).json({

            success: true,

            documents,

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};