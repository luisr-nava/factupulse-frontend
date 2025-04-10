import React from "react";

export default function Benefits() {
  return (
    <section className="space-y-10 mt-10 mb-14 text-center lg:mx-36">
      <h2 className="text-4xl font-bold  lg:text-6xl">¿Cómo te ayuda?</h2>

      <p className="text-lg mt-7 font-normal text-muted-foreground lg:text-2xl">
        FactuPulse está diseñada para que puedas concentrarte en hacer crecer tu
        negocio sin perder tiempo en tareas repetitivas o complejas. Te da las
        herramientas necesarias para tener el control total de tu operación
        diaria, con una experiencia simple y potente.
      </p>

      <ul className="text-xs my-10 grid gap-5 font-medium lg:text-xl lg:justify-center lg:my-14 lg:gap-8">
        <li>
          💰 <strong>Control total de ingresos y egresos</strong> con historial,
          categorías y reportes
        </li>
        <li>
          📦 <strong>Gestión de productos y stock en tiempo real</strong> para
          saber siempre qué tenés y qué necesitás reponer
        </li>
        <li>
          👥 <strong>Control de empleados</strong> con permisos personalizados y
          seguimiento de actividad
        </li>
        <li>
          📊 <strong>Dashboard visual</strong> con métricas clave para tomar
          mejores decisiones cada día
        </li>
        <li>
          ☁️ <strong>Todo en la nube</strong>: accedé desde cualquier
          dispositivo, estés donde estés
        </li>
        <li>
          🧾 <strong>Emisión rápida de comprobantes</strong> para ventas en
          local u online
        </li>
        <li>
          📈 <strong>Automatización de tareas</strong> como alertas de stock o
          reportes mensuales
        </li>
      </ul>

      <p className="text-lg mt-7 font-normal text-muted-foreground lg:text-2xl">
        Ya no necesitás 4 apps distintas o depender de Excel. Con FactuPulse,
        tenés todo en un solo lugar, organizado, seguro y siempre accesible.
      </p>
    </section>
  );
}




