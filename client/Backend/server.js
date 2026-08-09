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
import medicalHistoryRoutes from "./routes/medicalHistory.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// =======================
// SOCKET.IO
// =======================

export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Vite ho to 5173 kar dena
        methods: ["GET", "POST"],
    },
});

// Connected Users
const users = {};

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // =======================
    // REGISTER USER
    // =======================

    socket.on("register", (userId) => {

        users[userId] = socket.id;

        socket.join(userId);

        console.log("Registered Users:", users);

    });

    // =======================
    // DOCTOR CALLS PATIENT
    // =======================

    socket.on("call-patient", ({ doctorId, patientId, appointmentId }) => {

        const patientSocket = users[patientId];

        if (patientSocket) {

            io.to(patientSocket).emit("incoming-call", {

                doctorId,
                appointmentId,

            });

        }

    });

    // =======================
    // PATIENT ACCEPTS CALL
    // =======================

    socket.on("accept-call", ({ doctorId, appointmentId }) => {

        const doctorSocket = users[doctorId];

        if (doctorSocket) {

            io.to(doctorSocket).emit("call-accepted", {

                appointmentId,

            });

        }

    });

    // =======================
    // LIVE CHAT
    // =======================

    socket.on("send-message", ({ receiverId, sender, message }) => {

        const receiverSocket = users[receiverId];

        if (receiverSocket) {

            io.to(receiverSocket).emit("receive-message", {

                sender,
                message,
                time: new Date(),

            });

        }

    });

    // =======================
    // DISCONNECT
    // =======================

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

// =======================
// DATABASE
// =======================

connectDB();

// =======================
// MIDDLEWARE
// =======================

app.use(cors());
app.use(express.json());

// =======================
// STATIC UPLOADS
// =======================

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

// =======================
// ROUTES
// =======================

app.get("/", (req, res) => {

    res.send("Backend Running...");

});

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/medical-history", medicalHistoryRoutes);

// =======================
// START SERVER
// =======================

httpServer.listen(5000, () => {

    console.log("🚀 Server Running on Port 5000");

});