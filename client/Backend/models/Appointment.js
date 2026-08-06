import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },

    day: {
        type: String,
        required: true,
    },

    // FULL DATE
    // Example: 31-07-2026
    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Waiting",
            "In Progress",
            "Completed",
            "Cancelled",
        ],
        default: "Pending",
    },
}, {
    timestamps: true,
});

export default mongoose.model(
    "Appointment",
    appointmentSchema
);