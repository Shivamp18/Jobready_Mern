
import { io } from "socket.io-client";

const socket = io("https://jobready-kdmw.onrender.com"); // Adjust if backend is hosted elsewhere

export default socket;
