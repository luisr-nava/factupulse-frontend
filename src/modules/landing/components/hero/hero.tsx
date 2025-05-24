import { LinkButton } from "@/components";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LockKeyhole,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="text-center mb-10">
      <h1 className="text-4xl font-bold  lg:text-6xl">
        Tu negocio, más simple. Tu gestión, más clara.
      </h1>
      <p className="text-lg mt-7 font-normal text-muted-foreground lg:text-2xl">
        FactuPulse es una plataforma integral para emprendedores y pequeños
        negocios que quieren llevar su gestión al siguiente nivel sin
        complicaciones.
      </p>

      <ul className="text-sm my-10 grid gap-10 font-medium lg:text-xl lg:justify-center lg:my-16 lg:gap-14">
        <li className="flex items-center gap-2">
          <BadgeCheck
            className="w-4 h-4 text-emerald-600
          lg:w-8 lg:h-8
          "
          />
          Emití facturas en segundos, desde cualquier dispositivo
        </li>
        <li className="flex items-center gap-2">
          <ChartNoAxesCombined className="w-4 h-4 text-emerald-600 lg:w-8 lg:h-8" />{" "}
          Visualizá tus ingresos y egresos en tiempo real
        </li>
        <li className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-700 lg:w-8 lg:h-8" /> Gestioná tu
          equipo, productos y ventas en un solo lugar
        </li>
        <li className="flex items-center gap-2">
          <LockKeyhole className="w-4 h-4 text-yellow-500 lg:w-8 lg:h-8" />{" "}
          Información segura y en la nube
        </li>
      </ul>
      <div className="flex justify-center gap-4 mb-10 lg:mb-14">
        <LinkButton href="/auth/register">Probar ahora</LinkButton>
      </div>
    </section>
  );
}

