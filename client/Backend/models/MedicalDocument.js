import mongoose from "mongoose";


const medicalDocumentSchema = new mongoose.Schema({

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


    fileName: {
        type: String,
        required: true
    },


    filePath: {
        type: String,
        required: true
    },


    uploadedAt: {
        type: Date,
        default: Date.now
    }


});


const MedicalDocument = mongoose.model(
    "MedicalDocument",
    medicalDocumentSchema
);


export default MedicalDocument;