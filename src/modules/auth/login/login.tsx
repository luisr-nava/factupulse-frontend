import Link from "next/link";
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
          <Link
            href="/auth/register"
            className="text-factuCyan font-semibold hover:text-factuCyan/80 duration-300">
            Registrate
          </Link>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{" "}
          <Link
            href="/auth/forgot-password"
            className="text-factuCyan font-semibold hover:text-factuCyan/80 duration-300">
            Recuperar contraseña
          </Link>
        </p>
      </div>
    </div>
  );
}


