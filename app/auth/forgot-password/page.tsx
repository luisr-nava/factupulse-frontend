import { ForgotPassword } from "@/src/modules/auth/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contraseña | FactuPulse",
  description:
    "Recupera tu contraseña de FactuPulse. Ingresa tu correo electrónico y recibiras un enlace para restablecer tu contraseña.",
};
export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}






