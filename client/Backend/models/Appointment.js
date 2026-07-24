import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },


    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },


    day: {
        type: String,
        required: true
    },


    date: {
        type: Number,
        required: true
    },


    time: {
        type: String,
        required: true
    },


    status: {
        type: String,
        default: "Pending"
    }


}, {
    timestamps: true
});


export default mongoose.model(
    "Appointment",
    appointmentSchema
);