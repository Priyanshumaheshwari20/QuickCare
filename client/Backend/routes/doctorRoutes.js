import express from "express";
import {
    doctorSignup,
    getDoctors,
    doctorLogin,
    toggleAvailability,
    getDoctorById,
    updateDoctor
} from "../controllers/doctorControllers.js";

const router = express.Router();

router.post("/signup", doctorSignup);

router.get("/", getDoctors);
router.post("/login", doctorLogin);
router.put("/availability/:id", toggleAvailability);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor);
export default router;