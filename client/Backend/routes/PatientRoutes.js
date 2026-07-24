import express from "express";
import {
    patientSignup,
    patientLogin,
    getPatientProfile,
} from "../controllers/PatientControllers.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Patient Route Working");
});
// Patient Signup
router.post("/signup", patientSignup);
// Patient Login
router.post("/login", patientLogin);
//MYPROFILE
router.get("/:id", getPatientProfile);
export default router;