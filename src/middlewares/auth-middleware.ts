import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // 🔐 Si hay token y entra a cualquier /auth/*
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔒 Si entra a /dashboard sin token, redirigir al login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

