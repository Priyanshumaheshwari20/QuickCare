import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";


// Patient Signup

export const patientSignup = async(req, res) => {

    try {
        const { name, gender, age, email, phoneNumber, place, password } = req.body;
        const existingPatient = await Patient.findOne({ email });

        if (existingPatient) {
            return res.status(400).json({
                message: "Email already registered"
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = await Patient.create({ name, gender, age, email, phoneNumber, place, password: hashedPassword });

        res.status(201).json({
            message: "Patient Registered Successfully",
            patient
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: error.message
        });

    }

};
// Patient Login (Email Only)
export const patientLogin = async(req, res) => {
    try {
        const { email } = req.body;

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });

        }
        res.status(200).json({
            message: "Login Successfully",
            patient: {
                _id: patient._id,
                name: patient.name,
                email: patient.email
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


export const getPatientProfile = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select("-password");

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            patient,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};