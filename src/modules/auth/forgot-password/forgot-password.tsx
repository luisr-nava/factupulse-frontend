import { AppButton } from "@/components";
import { ForgotPasswordForm } from "./components";
import { useForgotPassword } from "./hooks";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const { setShowSuccessMessage, showSuccessMessage, onSubmit, isPending } =
    useForgotPassword();
  return (
    <div className="text-center space-y-2 mb-6 dark:text-white">
      {showSuccessMessage ? (
        <>
          <h1 className="text-3xl font-bold lg:text-4xl">
            ¡Correo enviado con éxito!
          </h1>
          <p className="text-lg font-semibold mb-4">
            Se ha enviado un correo electrónico con instrucciones para
            restablecer tu contraseña.
          </p>
          <AppButton onClick={() => router.push("/auth/login")}>
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
          <div className="mt-6 mx-auto w-1/4">
            {" "}
            <ForgotPasswordForm onSubmit={onSubmit} isPending={isPending} />
          </div>
        </>
      )}
    </div>
  );
}

