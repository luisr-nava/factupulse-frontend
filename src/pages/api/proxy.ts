import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extraer la URL base y los parámetros adicionales
  const { url, ...queryParams } = req.query;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!url || typeof url !== "string" || !token) {
    return res.status(401).json({
      message: ["No autorizado o sin ruta"],
      error: "Unauthorized",
      statusCode: 401,
    });
  }

  // Construir la URL final correctamente
  const backendBaseUrl = `http://localhost:3000/api${url}`;

  // Crear un objeto URL para manejar los parámetros correctamente
  const backendUrl = new URL(backendBaseUrl);

  // Añadir los parámetros de consulta originales de la URL del proxy
  for (const [key, value] of Object.entries(queryParams)) {
    if (typeof value === "string") {
      backendUrl.searchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => backendUrl.searchParams.append(key, v));
    }
  }

  // Si hay body en POST/PUT/PATCH, añadir esos parámetros también
  const method = req.method ?? "GET";
  let body: string | undefined;

  if (["POST", "PUT", "PATCH"].includes(method)) {
    body = JSON.stringify(req.body);
    // Para métodos POST, puedes añadir los query params al body si es necesario
  }

  try {
    const response = await fetch(backendUrl.toString(), {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    });

    const text = await response.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({
      message: ["Error al conectar con el backend"],
      error: err instanceof Error ? err.message : String(err),
      statusCode: 500,
    });
  }
}
