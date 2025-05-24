import { ResetPasswordForm } from "./components";

export default function ResetPassword() {
  return (
    <div className="text-center space-y-2 mb-6 dark:text-white">
      <h1 className="text-3xl font-bold lg:text-4xl">Restablecer contraseña</h1>
      <p className="text-muted-foreground lg:text-xl">
        Ingresá tu nueva contraseña para completar el proceso.
      </p>
      <div className="flex justify-center">
        <ResetPasswordForm />
      </div>
    </div>
  );
}


