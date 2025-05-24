import { useEffect } from "react";
import type { Socket } from "socket.io-client";

interface EventHandler {
  event: string;
  handler: (...args: any[]) => void;
}

/**
 * Hook para suscribirse y limpiar eventos de un socket dinámicamente.
 * @param socket Instancia de socket (puede ser null).
 * @param handlers Array de { event, handler }.

 */
export function useSocketListener(
  socket: Socket | null,
  handlers: EventHandler[],
) {
  useEffect(() => {
    if (!socket) {
      // console.log("🔌 No socket instance, skipping listeners...");
      return;
    }

    if (!socket.connected) {
      // console.log("⏳ Socket no conectado aún, listeners pendientes...");
      return;
    }

    for (const { event, handler } of handlers) {
      socket.on(event, handler);
    }

    // console.log(
    //   "✅ Socket listeners registrados:",
    //   handlers.map((h) => h.event),
    // );

    return () => {
      for (const { event, handler } of handlers) {
        socket.off(event, handler);
      }
      // console.log(
      //   "❎ Socket listeners eliminados:",
      //   handlers.map((h) => h.event),
      // );
    };
  }, [socket, handlers]);
}
