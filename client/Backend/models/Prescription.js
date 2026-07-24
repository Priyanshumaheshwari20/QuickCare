import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({

    medicine: {
        type: String,
        required: true,
    },

    dosage: {
        type: String,
        required: true,
    },

    frequency: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    instruction: {
        type: String,
        required: true,
    }

});

const prescriptionSchema = new mongoose.Schema({

    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },

    symptoms: [{
        type: String,
    }],

    diagnosis: {
        type: String,
    },

    medicines: [
        medicineSchema
    ],

    advice: {
        type: String,
    },

    report: {
        type: String,
    },

    pdf: {
        type: String,
        default: ""
    }

}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);