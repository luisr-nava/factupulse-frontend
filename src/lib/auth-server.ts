import { parse } from "cookie";
import type { GetServerSidePropsContext } from "next";

// Obtiene el token de la cookie
export function getAuthToken(ctx: GetServerSidePropsContext) {
  const cookieHeader = ctx.req.headers.cookie || "";
  const cookies = parse(cookieHeader);
  return cookies.token ?? null;
}

// Proteger rutas privadas
export function withAuthRedirect(
  ctx: GetServerSidePropsContext,
  redirectTo = "/auth/login",
) {
  const token = getAuthToken(ctx);
  if (!token) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

// Redirigir si ya está logueado (para rutas públicas como login/register)
export function redirectIfAuthenticated(
  ctx: GetServerSidePropsContext,
  redirectTo = "/dashboard",
) {
  const token = getAuthToken(ctx);
  if (token) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

