
import { io } from "socket.io-client";

console.log('Type of io:', typeof io);
const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
console.log('Socket URL:', socketUrl);
const socket = io(socketUrl);
console.log('Socket object after initialization:', socket);

export default socket;
