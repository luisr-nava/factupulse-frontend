import { AuthGuard } from "@/components";
import { Register } from "@/modules/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | FactuPulse",
  description: "Creá tu cuenta en FactuPulse y empezá a ordenar tu negocio.",
};

export default function RegisterPage() {
  return (
    <AuthGuard protected={false}>
      <Register />
    </AuthGuard>
  );
}

