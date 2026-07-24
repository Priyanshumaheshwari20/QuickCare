import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
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

    fileName: {
        type: String,
        required: true,
    },

    filePath: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Document", documentSchema);