import { LinkButton } from "@/components";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="space-y-10 mt-10 mb-16 text-center lg:mx-36">
      <h3 className="text-4xl font-bold  lg:text-6xl">
        Empezá a ordenar tu negocio hoy mismo.
      </h3>
      <p className="text-lg mt-7 font-normal text-muted-foreground lg:text-2xl ">
        Usar <strong className="text-factuCyan">FactuPulse</strong> es
        totalmente gratis y no necesitás tarjeta de crédito. En minutos podés
        estar facturando, organizando tu stock y viendo tus ingresos desde
        cualquier lugar.
      </p>
      <div className="mt-10">
        <LinkButton href="/auth/register">Crear mi cuenta</LinkButton>
      </div>
    </section>
  );
}

