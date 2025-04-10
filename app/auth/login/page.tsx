import { Login } from "@/src/modules/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión | FactuPulse",
  description: "Inicia sesión en FactuPulse y accede a tu cuenta.",
};

export default function LoginPage() {
  return <Login />;
}

