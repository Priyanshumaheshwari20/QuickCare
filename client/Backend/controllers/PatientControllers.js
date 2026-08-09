import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";


// ===============================
// Patient Signup
// ===============================

export const patientSignup = async(req, res) => {

    try {

        const {
            name,
            gender,
            age,
            bloodGroup,
            email,
            phoneNumber,
            emergencyContact,
            state,
            city,
            address,
            pinCode,
            password
        } = req.body;


        const existingPatient = await Patient.findOne({ email });


        if (existingPatient) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const patient = await Patient.create({

            name,
            gender,
            age,
            bloodGroup,
            email,
            phoneNumber,
            emergencyContact,
            state,
            city,
            address,
            pinCode,
            password: hashedPassword

        });



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




// ===============================
// Patient Login
// ===============================

export const patientLogin = async(req, res) => {


    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            patient.password
        );



        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid Password"

            });


        }
        res.status(200).json({

            message: "Login Successfully",
            patient: {

                _id: patient._id,

                name: patient.name,

                email: patient.email,

                role: "patient"

            }

        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            message: error.message

        });


    }

};

// Get Patient Profile
//Database se patient ki profile lekar frontend ko bhejna.
// ===============================

export const getPatientProfile = async(req, res) => {


    try {


        const patient = await Patient.findById(req.params.id)
            .select("-password");



        if (!patient) {


            return res.status(404).json({

                success: false,

                message: "Patient not found"

            });


        }



        res.status(200).json({

            success: true,

            patient

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};



// Update Patient Profile
// ===============================


export const updatePatientProfile = async(req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id,


                {


                    name: req.body.name,

                    email: req.body.email,

                    gender: req.body.gender,

                    age: req.body.age,


                    bloodGroup: req.body.bloodGroup,


                    phoneNumber: req.body.phoneNumber,


                    emergencyContact: req.body.emergencyContact,


                    state: req.body.state,


                    city: req.body.city,


                    address: req.body.address,


                    pinCode: req.body.pinCode

                }, {
                    new: true /* Updated document return karo.*/
                })
            .select("-password");

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            patient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
};