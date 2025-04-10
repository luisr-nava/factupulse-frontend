import Link from "next/link";
import { RegisterForm } from "./components";

export default function Register() {
  return (
    <div className="text-center space-y-2 mb-6">
      <h1 className="text-3xl font-bold lg:text-4xl">Crear tu cuenta</h1>
      <p className="text-muted-foreground lg:text-xl">
        Comenzá gratis en minutos. Sin tarjeta de crédito, sin complicaciones.
      </p>
      <div className="">
        <RegisterForm />
      </div>
      <div className="grid justify-center lg:text-xl">
        <p>
          ¿Tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-factuCyan font-semibold hover:text-factuCyan/80 duration-300">
            Iniciar sesión
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


