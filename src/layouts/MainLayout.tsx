import { HeaderDasboard, LinkButton } from "@/components";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <HeaderDasboard setMobileMenuOpen={setMobileMenuOpen} />

      {/* Menú móvil */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Contenido principal con scroll solo en children */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-1/5 flex-col p-4 gap-5">
          <LinkButton
            href="/dashboard"
            className={
              pathname === "/dashboard" ? "bg-accent pl-5" : undefined
            }>
            Dashboard
          </LinkButton>
          <LinkButton
            href="/sales"
            className={pathname === "/sales" ? "bg-accent" : undefined}>
            Ventas
          </LinkButton>
          <LinkButton
            href="/products"
            className={
              pathname === "/products"
                ? "scale-105 !text-gray-700 cursor-not-allowed hover:!text-gray-700"
                : undefined
            }>
            Productos
          </LinkButton>
          <LinkButton
            href="/employee"
            className={
              pathname === "/employee"
                ? "scale-105 !text-gray-700 cursor-not-allowed hover:!text-gray-700"
                : undefined
            }>
            Empleados
          </LinkButton>
          <LinkButton
            href="/pos"
            className={pathname === "/pos" ? "bg-accent" : undefined}>
            Punto de venta
          </LinkButton>
        </aside>

        {/* SOLO este elemento scrollea */}
        <main className="w-full md:w-4/5 h-full overflow-y-auto p-4 dark:bg-primary-700 rounded-tl-xl">
          {children}
        </main>
      </div>
    </div>
  );
}

