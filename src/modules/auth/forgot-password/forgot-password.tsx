"use client";

import { AppButton } from "@/components/ui/button";
import { ForgotPasswordForm } from "./components";
import { useForgotPassword } from "./hooks";

export default function ForgotPassword() {
  const { setShowSuccessMessage, showSuccessMessage } = useForgotPassword();
  return (
    <div className="text-center space-y-2 mb-6">
      {showSuccessMessage ? (
        <>
          <h1 className="text-3xl font-bold lg:text-4xl">
            ¡Correo enviado con éxito!
          </h1>
          <p className="text-lg font-semibold mb-4">
            Se ha enviado un correo electrónico con instrucciones para
            restablecer tu contraseña.
          </p>
          <AppButton
            onClick={() => setShowSuccessMessage(false)}
            className="bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
            Volver al inicio de sesión
          </AppButton>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold lg:text-4xl">
            Recuperar contraseña
          </h1>
          <p className="text-muted-foreground lg:text-xl">
            Ingresá tu correo y te enviaremos un código para restablecer tu
            contraseña.
          </p>
          <div className="mt-6">
            {" "}
            <ForgotPasswordForm />{" "}
          </div>
        </>
      )}
    </div>
  );
}

