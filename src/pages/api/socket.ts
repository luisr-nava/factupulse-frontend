// src/pages/api/socket.ts

import { NextApiRequest } from "next";
import { createProxyServer } from "http-proxy";

const proxy = createProxyServer({
  target: "http://localhost:3000", // 🔥 donde corre tu backend NestJS
  ws: true, // 🔥 habilitar WebSocket
  changeOrigin: true,
  secure: false,
});

export const config = {
  api: {
    bodyParser: false, // 🔥 MUY IMPORTANTE para WebSocket
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: any) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  proxy.web(req, res, undefined, (error) => {
    console.error("Proxy error:", error);
    res.status(500).send("Proxy error");
  });
}

// 👇 manejo del upgrade de WebSocket
export const onUpgrade = (req: any, socket: any, head: any) => {
  proxy.ws(req, socket, head);
};

