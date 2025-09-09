
import { io } from "socket.io-client";

let socketInstance = null;

const getSocket = () => {
  if (!socketInstance) {
    const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
    socketInstance = io(socketUrl);
  }
  return socketInstance;
};

export default getSocket;
