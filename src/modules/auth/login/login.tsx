// import { LoginForm } from "./components";
"use client";

import { AppLink } from "@/components/ui/link";
import { LoginForm } from "./components";

export default function Login() {
  return (
    <div className="text-center space-y-2 mb-6">
      <h1 className="text-3xl font-bold lg:text-4xl">Iniciá sesión</h1>
      <p className="text-muted-foreground lg:text-xl">
        Accedé a tu cuenta para empezar a gestionar tu negocio con FactuPulse.
      </p>
      <div className="">
        <LoginForm />
      </div>
      <div className="grid justify-center lg:text-xl">
        <p>
          ¿No tenés una cuenta?{" "}
          <AppLink href="/auth/register" className="text-primary">
            Registrate
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


