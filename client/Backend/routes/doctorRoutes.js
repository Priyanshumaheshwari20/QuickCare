import express from "express";
import { doctorSignup, getDoctors, doctorLogin } from "../controllers/doctorControllers.js";

const router = express.Router();

router.post("/signup", doctorSignup);

router.get("/", getDoctors);
router.post("/login", doctorLogin);
export default router;