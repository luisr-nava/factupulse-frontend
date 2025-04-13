import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { searchParams } = new URL(req.url);

  const url = searchParams.get("url");
  if (!token || !url) {
    return new Response("No autorizado o sin ruta", { status: 400 });
  }

  const backendUrl = `http://localhost:3000/api${url}`;

  const response = await fetch(backendUrl, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!token || !url) {
    return new Response("No autorizado o sin ruta", { status: 400 });
  }

  const body = await req.text(); // o req.json() si lo vas a parsear

  const backendUrl = `http://localhost:3000/api${url}`;

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return Response.json(data);
}

