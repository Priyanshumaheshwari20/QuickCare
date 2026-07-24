import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    specialization: {
        type: String,
        required: true,
    },

    qualification: {
        type: String,
        required: true,
    },

    experience: {
        type: Number,
        required: true,
    },

    hospital: {
        type: String,
        required: true,
    },

    consultationFee: {
        type: Number,
        required: true,
    },

    about: {
        type: String,
        required: true,
    },

    image: String,
}, {
    timestamps: true,
});

export default mongoose.model("Doctor", doctorSchema);