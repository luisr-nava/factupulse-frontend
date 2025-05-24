import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket"; // tu conexión socket.io-client

const SocketContext = createContext<ReturnType<typeof getSocket> | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(
    null,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    s.on("connect", () => {
      setReady(true);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  if (!ready || !socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};

