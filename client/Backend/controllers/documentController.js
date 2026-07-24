import Document from "../models/Document.js";

export const uploadDocument = async(req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        // agar PDF nahi aayi
        if (!req.file) {

            return res.status(400).json({
                message: "PDF not found"
            });

        }


        const { patientId, doctorId } = req.body;


        const document = await Document.create({

            patientId: patientId,

            doctorId: doctorId,

            fileName: req.file.filename,

            filePath: req.file.path

        });


        res.status(201).json({

            success: true,

            message: "PDF Uploaded Successfully",

            document

        });


    } catch (error) {


        console.log(error);


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};