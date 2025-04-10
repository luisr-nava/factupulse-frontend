import { Register } from "@/src/modules/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | FactuPulse",
  description: "Creá tu cuenta en FactuPulse y empezá a ordenar tu negocio.",
};

export default function RegisterPage() {
  return <Register />;
}

