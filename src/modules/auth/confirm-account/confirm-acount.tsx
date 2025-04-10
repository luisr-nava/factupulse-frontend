import { AccountVerificationForm, ResendVerificationEmail } from "./components";

export default function ConfirmAcount() {
  return (
    <div className="text-center space-y-4 mb-6">
      <h1 className="text-3xl font-bold lg:text-4xl">Verificá tu cuenta</h1>
      <p className="text-muted-foreground lg:text-xl">
        Ingresá el código de 6 dígitos que te enviamos por correo.
      </p>
      <AccountVerificationForm />
      <div>
        <ResendVerificationEmail />
      </div>
    </div>
  );
}

