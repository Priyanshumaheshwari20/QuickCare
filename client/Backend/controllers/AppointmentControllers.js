import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import { io } from "../server.js";
// ===============================
// CREATE APPOINTMENT
// ===============================
// ===============================
// CREATE APPOINTMENT
// ===============================
export const createAppointment = async(req, res) => {
    try {
        const {
            patientId,
            doctorId,
            day,
            date,
            time,
        } = req.body;

        // Required fields
        if (!patientId ||
            !doctorId ||
            !date ||
            !time
        ) {
            return res.status(400).json({
                message: "Patient, doctor, date and time are required",
            });
        }

        // ==========================================
        // CONVERT DATE TO FULL FORMAT
        // ==========================================

        let fullDate = String(date).trim();

        /*
          Frontend agar sirf 31 bhej raha hai,
          toh usse full date nahi banaya ja sakta.

          Frontend ko preferably:
          31-07-2026

          bhejna chahiye.
        */

        // Check full date format
        const dateParts = fullDate.split("-");

        if (
            dateParts.length === 3 &&
            dateParts[0].length <= 2
        ) {
            let dayPart = dateParts[0];
            let monthPart = dateParts[1];
            let yearPart = dateParts[2];

            dayPart = dayPart.padStart(2, "0");
            monthPart = monthPart.padStart(2, "0");

            if (yearPart.length === 2) {
                yearPart = `20${yearPart}`;
            }

            fullDate = `${dayPart}-${monthPart}-${yearPart}`;
        }

        // ==========================================
        // CHECK DATE
        // ==========================================

        if (!/^\d{2}-\d{2}-\d{4}$/.test(
                fullDate
            )) {
            return res.status(400).json({
                message: "Invalid date format. Use DD-MM-YYYY",
                receivedDate: date,
            });
        }

        // ==========================================
        // CHECK PATIENT
        // ==========================================

        const patient =
            await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found",
            });
        }

        // ==========================================
        // CHECK DOCTOR
        // ==========================================

        const doctor =
            await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        // ==========================================
        // CHECK SAME DOCTOR
        // SAME DATE + SAME TIME
        // ==========================================

        const existingAppointment =
            await Appointment.findOne({
                doctorId,
                date: fullDate,
                time,
                status: {
                    $ne: "Cancelled",
                },
            });

        if (existingAppointment) {
            return res.status(409).json({
                message: "This time slot is already booked for this doctor",
            });
        }

        // ==========================================
        // CREATE APPOINTMENT
        // ==========================================

        const appointment =
            new Appointment({
                patientId,
                doctorId,
                day,
                date: fullDate,
                time,
                status: "Pending",
            });

        await appointment.save();

        return res.status(201).json({
            message: "Appointment booked successfully",
            appointment,
        });

    } catch (error) {
        console.error(
            "Create Appointment Error:",
            error
        );

        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ===============================
// GET PATIENT APPOINTMENTS
// ===============================
export const getPatientAppointments = async(req, res) => {
    try {
        const { patientId } = req.params;

        const appointments = await Appointment.find({
                patientId,
                status: { $ne: "Cancelled" }, // <-- Ye line add karo
            })
            .populate(
                "doctorId",
                "name specialization qualification experience hospital consultationFee image"
            )
            .sort({ date: 1, time: 1 });

        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Get Patient Appointments Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ===============================
// CANCEL APPOINTMENT
// ===============================
export const deleteAppointment = async(req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        appointment.status = "Cancelled";

        await appointment.save();

        return res.status(200).json({
            message: "Appointment cancelled successfully"
        });

    } catch (error) {
        console.error("Cancel Appointment Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ===============================
// GET DOCTOR APPOINTMENTS
// ===============================
export const getDoctorAppointments = async(req, res) => {
    try {
        const { doctorId } = req.params;

        const appointments = await Appointment.find({
                doctorId
            })
            .populate(
                "patientId",
                "name email phoneNumber gender age place"
            )
            .sort({ date: 1, time: 1 });

        return res.status(200).json(appointments);

    } catch (error) {
        console.error("Get Doctor Appointments Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ===============================
// GET TOTAL APPOINTMENT COUNT
// ===============================
export const getAppointmentCount = async(req, res) => {
    try {
        const { doctorId } = req.params;

        const count = await Appointment.countDocuments({
            doctorId,
            status: { $ne: "Cancelled" }
        });

        return res.status(200).json({
            totalAppointments: count
        });

    } catch (error) {
        console.error("Get Appointment Count Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ===============================
// GET UNIQUE PATIENT COUNT
// ===============================
export const getPatientCount = async(req, res) => {
    try {
        const { doctorId } = req.params;

        const appointments = await Appointment.find({
            doctorId,
            status: { $ne: "Cancelled" }
        }).select("patientId");

        // Unique patient IDs
        const uniquePatientIds = new Set(
            appointments.map(
                (appointment) => appointment.patientId.toString()
            )
        );

        return res.status(200).json({
            totalPatients: uniquePatientIds.size
        });

    } catch (error) {
        console.error("Get Patient Count Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ===============================
// GET UNIQUE PATIENT COUNT
// ===============================
export const getUniquePatientCount = async(req, res) => {
    try {
        const { doctorId } = req.params;

        const patientIds = await Appointment.distinct("patientId", {
            doctorId,
            status: { $ne: "Cancelled" }
        });

        return res.status(200).json({
            totalPatients: patientIds.length
        });

    } catch (error) {
        console.error("Get Unique Patient Count Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export const updateAppointmentStatus = async(req, res) => {
    try {
        console.log("Status API HIT");
        console.log(req.params);
        console.log(req.body);

        const { appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId, { status }, { new: true }
        );


        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate("patientId", "name email phoneNumber gender age place");

        io.to(appointment.doctorId.toString()).emit(
            "appointment-status-updated",
            populatedAppointment
        );


        return res.status(200).json({
            message: "Status Updated Successfully",
            appointment: populatedAppointment,

        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const permanentDeleteAppointment = async(req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            message: "Appointment deleted permanently",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};