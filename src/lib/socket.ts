import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
  withCredentials: true, // si usás cookies JWT
  transports: ["websocket"],
});
