import Appointment from "../models/Appointment.js";


export const createAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.create(
            req.body
        );

        res.status(201).json({
            message: "Appointment Booked Successfully",
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};





export const getPatientAppointments = async(req, res) => {
    try {

        const { patientId } = req.params;

        const appointments = await Appointment.find({
            patientId,
        }).populate("doctorId");


        res.status(200).json({

            success: true,

            appointments,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};



export const cancelAppointment = async(req, res) => {

    try {

        const { id } = req.params;


        const appointment = await Appointment.findByIdAndDelete(id);


        if (!appointment) {

            return res.status(404).json({

                success: false,

                message: "Appointment not found",

            });

        }


        res.status(200).json({

            success: true,

            message: "Appointment cancelled successfully",

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


export const getDoctorAppointments = async(req, res) => {

    try {

        const { doctorId } = req.params;


        const appointments = await Appointment.find({
                doctorId: doctorId
            })
            .populate(
                "patientId",
                "name age gender bloodGroup email phoneNumber emergencyContact state city address pinCode"
            );

        res.status(200).json({
            appointments
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



export const getAppointmentCount = async(req, res) => {

    try {

        const { doctorId } = req.params;


        const totalAppointments = await Appointment.countDocuments({
            doctorId: doctorId
        });


        res.json({
            success: true,
            totalAppointments
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}


export const getAppointmentById = async(req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.appointmentId)
            .populate("patientId")
            .populate("doctorId");

        res.status(200).json({
            success: true,
            appointment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getPatientCount = async(req, res) => {

    // Async function hai kyunki database se data fetch karna hai.
    console.log("Patient Count API Hit");

    try {

        // Agar database kaam sahi karega to ye block chalega.

        const { doctorId } = req.params;

        // URL se doctorId nikal rahe hain.
        // Example:
        // /api/appointments/patients/count/12345
        // doctorId = 12345

        const appointments = await Appointment.find({ doctorId });

        // Appointment collection me se is doctor ki saari appointments la rahe hain.

        const uniquePatients = [

            // Naya array bana rahe hain jisme duplicate patient nahi honge.

            ...new Set(

                // Set duplicate values ko automatically remove kar deta hai.

                appointments.map((item) =>

                    // map har appointment par chalega.

                    item.patientId.toString()

                    // Har appointment me se sirf patientId nikal rahe hain.
                    // toString() isliye use kiya kyunki patientId ObjectId hoti hai.
                    // Set strings ke saath achhe se unique values banata hai.

                )

            ),

        ];

        res.status(200).json({

            // Success response bhej rahe hain.

            totalPatients: uniquePatients.length,

            // uniquePatients array ki length hi total patients hai.

        });

    } catch (error) {

        // Agar database ya code me koi error aata hai to catch chalega.

        res.status(500).json({

            // Client ko 500 Internal Server Error bhej rahe hain.

            message: error.message,

            // Actual error message frontend ko bhej rahe hain.

        });

    }

};


export const updateAppointmentStatus = async(req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId, { status }, { new: true }
        );

        res.json({
            success: true,
            appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Status update failed",
        });
    }
};