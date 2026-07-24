import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/PatientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/PrescriptionRoutes.js";
import documentRoutes from "./routes/documentRoutes.js"
const app = express();

connectDB();
//ADD A middleware
//Built in middle ware
app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running...");
});
app.use("/api/doctors", doctorRoutes);

app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/documents", documentRoutes);
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});