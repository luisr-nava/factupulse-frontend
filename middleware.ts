import { NextRequest } from "next/server";
import { authMiddleware } from "./src/middlewares/auth-middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};



