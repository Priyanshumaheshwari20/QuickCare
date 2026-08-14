import { io } from "socket.io-client";

const socket = io("https://quickcare-3.onrender.com");

export default socket;