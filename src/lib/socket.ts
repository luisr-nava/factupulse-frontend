import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket"], // Solo websocket
      withCredentials: true,
      autoConnect: false, // 👈 NO autoconectar al crearlo
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });
  }

  if (!socket.connected) {
    socket.connect(); // 👈 Siempre aseguramos que intente conectar
  }

  return socket;
};

