import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/PatientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/PrescriptionRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Agar Vite use kar rahe ho to 5173 kar dena
        methods: ["GET", "POST"],
    },
});

// Connected users
const users = {};

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("register", (userId) => {
        users[userId] = socket.id;
        console.log("Registered Users:", users);
    });

    // Doctor -> Patient
    socket.on("call-patient", ({ doctorId, patientId, appointmentId }) => {

        const patientSocket = users[patientId];

        if (patientSocket) {
            io.to(patientSocket).emit("incoming-call", {
                doctorId,
                appointmentId,
            });
        }

    });

    // Patient -> Doctor
    socket.on("accept-call", ({ doctorId, appointmentId }) => {

        const doctorSocket = users[doctorId];

        if (doctorSocket) {
            io.to(doctorSocket).emit("call-accepted", {
                appointmentId,
            });
        }

    });

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);

        for (const id in users) {
            if (users[id] === socket.id) {
                delete users[id];
            }
        }

        console.log("Registered Users:", users);
    });

});

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.get("/", (req, res) => {
    res.send("Backend Running...");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/video", videoRoutes);

// Server
httpServer.listen(5000, () => {
    console.log("🚀 Server Running on Port 5000");
});