import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    bloodGroup: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },

    emergencyContact: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    pinCode: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    appointments: [{
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
        },

        doctorName: {
            type: String,
        },

        day: {
            type: String,
        },

        date: {
            type: Number,
        },

        time: {
            type: String,
        },

        status: {
            type: String,
            default: "Pending",
        },
    }, ],
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);