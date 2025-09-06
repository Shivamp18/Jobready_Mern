
import { io } from "socket.io-client";

const socket = io("https://jobready-ona5.onrender.com"); // Adjust if backend is hosted elsewhere

export default socket;
