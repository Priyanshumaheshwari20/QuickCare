import express from "express";
import { generateToken } from "../controllers/videoController.js";

const router = express.Router();

router.get("/token/:channelName", generateToken);

export default router;