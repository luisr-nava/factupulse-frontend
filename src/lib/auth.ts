// lib/auth.ts

export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("token_expiration");

  if (!token || !expiration) return null;

  const expiresAt = Number(expiration);
  const now = Date.now();

  if (now > expiresAt) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiration");
    return null;
  }

  return token;
}

