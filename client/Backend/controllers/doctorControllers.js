import Doctor from "../models/Doctor.js";

export const doctorSignup = async(req, res) => {
    try {
        console.log("Request Body:", req.body);

        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            message: "Doctor Registered Successfully",
            doctor,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};


export const getDoctors = async(req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({
            doctors
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getDoctorById = async(req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            doctor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const doctorLogin = async(req, res) => {

    console.log("Doctor Login API Hit");
    console.log(req.body);

    try {

        const { email } = req.body;

        const doctor = await Doctor.findOne({ email });

        console.log("Doctor Found:", doctor);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor Not Found",
            });
        }

        res.status(200).json({
            message: "Login Successfully",
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
            },
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const toggleAvailability = async(req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        doctor.availability = !doctor.availability;

        await doctor.save();

        res.json({
            success: true,
            availability: doctor.availability
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}