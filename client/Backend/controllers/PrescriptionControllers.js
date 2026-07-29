import Prescription from "../models/Prescription.js";
import Document from "../models/Document.js";
// Create Prescription


export const createPrescription = async(req, res) => {
    console.log("===== Prescription API Hit =====");
    console.log(req.body);

    try {

        const {
            appointmentId,
            doctorId,
            patientId,
            symptoms,
            diagnosis,
            medicines,
            advice,
            report
        } = req.body;

        console.log("Report ID:", report);
        const document = await Document.findById(report);

        console.log("Document:", document);
        let pdfPath = "";

        if (report) {
            const document = await Document.findById(report);

            if (document) {
                pdfPath = document.filePath.replace(/\\/g, "/");
            }
        }

        const prescription = await Prescription.create({
            appointmentId,
            doctorId,
            patientId,
            symptoms,
            diagnosis,
            medicines,
            advice,
            report,
            pdf: pdfPath
        });

        res.status(201).json({
            success: true,
            message: "Prescription Saved Successfully",
            prescription
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Prescription By Appointment

export const getPrescription = async(req, res) => {

    try {

        const prescription = await Prescription.findOne({

            appointmentId: req.params.appointmentId

        })

        .populate("doctorId")
            .populate("patientId");

        res.json({

            success: true,
            prescription

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Update Prescription

export const updatePrescription = async(req, res) => {

    try {

        const prescription = await Prescription.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        res.json({

            success: true,
            message: "Prescription Updated",

            prescription

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Delete Prescription

export const deletePrescription = async(req, res) => {

    try {

        await Prescription.findByIdAndDelete(req.params.id);

        res.json({

            success: true,
            message: "Prescription Deleted"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


export const getPatientPrescriptions = async(req, res) => {
    try {

        const prescriptions = await Prescription.find({
                patientId: req.params.patientId
            })
            .populate("doctorId")
            .populate("appointmentId");


        res.json({
            success: true,
            prescriptions
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}



// Controller: Get Previous Prescriptions of a Patient

// export const getDoctorPatientPrescriptions = async(req, res) => {
//     try {

//         // Step 1: URL se patientId lo
//         const { patientId } = req.params;

//         // Step 2: MongoDB me us patient ki saari prescriptions search karo
//         const prescriptions = await Prescription.find({
//             patientId: patientId
//         })

//         // Step 3: doctorId ko Doctor collection se replace karke doctor ki details lao
//         .populate("doctorId")

//         // Step 4: appointmentId ko Appointment collection se replace karke appointment details lao
//         .populate("appointmentId");

//         // Step 5: Agar data mil gaya to frontend ko bhej do
//         res.status(200).json({
//             success: true,
//             prescriptions
//         });

//     } catch (error) {

//         // Step 6: Agar koi error aaye to frontend ko error bhejo
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }
// };