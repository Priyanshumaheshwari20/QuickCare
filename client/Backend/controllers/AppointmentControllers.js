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
            .populate("patientId", "name age");


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