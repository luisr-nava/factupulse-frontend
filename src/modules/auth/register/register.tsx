import { RegisterForm } from "./components";
import { AppLink } from "@/components/ui/link";

export default function Register() {
  return (
    <div className="text-center space-y-2 mb-6">
      <h1 className="text-3xl font-bold lg:text-4xl">Crear tu cuenta</h1>
      <p className="text-muted-foreground lg:text-xl">
        Comenzá gratis en minutos. Sin tarjeta de crédito, sin complicaciones.
      </p>
      <>
        <RegisterForm />
      </>
      <div className="grid justify-center lg:text-xl">
        <p>
          ¿Tienes una cuenta?{" "}
          <AppLink href="/auth/login" className="text-primary">
            Iniciar sesión
          </AppLink>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{" "}
          <AppLink href="/auth/forgot-password" className="text-primary">
            Recuperar contraseña
          </AppLink>
        </p>
      </div>
    </div>
  );
}

