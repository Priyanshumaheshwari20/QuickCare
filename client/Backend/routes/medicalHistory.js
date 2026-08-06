import express from "express";
import { getMedicalHistory } from "../controllers/medicalHistory.js";

const router = express.Router();

router.get("/:patientId", getMedicalHistory);

export default router;