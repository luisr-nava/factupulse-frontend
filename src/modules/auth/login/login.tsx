import { LinkButton } from "@/components";
import { LoginForm } from "./components";

export default function Login() {
  return (
    <div className="text-center space-y-2 mb-6 dark:text-white">
      <h1 className="text-3xl font-bold lg:text-4xl">Iniciá sesión</h1>
      <p className="text-muted-foreground lg:text-xl">
        Accedé a tu cuenta para empezar a gestionar tu negocio con FactuPulse.
      </p>
      <div className="flex justify-center">
        <LoginForm />{" "}
      </div>
      <div className="grid justify-center lg:text-xl">
        <p>
          ¿No tenés una cuenta?{" "}
          <LinkButton isLink href="/auth/register">
            Registrate
          </LinkButton>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{" "}
          <LinkButton isLink href="/auth/forgot-password">
            Recuperar contraseña
          </LinkButton>
        </p>
      </div>
    </div>
  );
}

