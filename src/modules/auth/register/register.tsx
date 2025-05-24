import { LinkButton } from "@/components";
import { RegisterForm } from "./components";

export default function Register() {
  return (
    <div className="text-center space-y-2 mb-6 dark:text-white">
      <h1 className="text-3xl font-bold lg:text-4xl">Crear tu cuenta</h1>
      <p className="text-muted-foreground lg:text-xl">
        Comenzá gratis en minutos. Sin tarjeta de crédito, sin complicaciones.
      </p>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
      <div className="grid justify-center lg:text-xl">
        <p>
          ¿Tienes una cuenta?{" "}
          <LinkButton isLink href="/auth/login" className="text-primary">
            Iniciar sesión
          </LinkButton>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{" "}
          <LinkButton
            isLink
            href="/auth/forgot-password"
            className="text-primary">
            Recuperar contraseña
          </LinkButton>
        </p>
      </div>
    </div>
  );
}

