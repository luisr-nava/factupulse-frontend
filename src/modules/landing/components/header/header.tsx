"use client";

import { Footer } from "@/src/components";
import { Logo } from "@/src/components/logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-200 px-4 py-3 lg:py-6 flex items-center justify-between border-b border-primary-300 dark:border-primary-700 shadow-lg">
        <Logo />

        <div className="flex items-center gap-2">
          {/* Hamburguesa mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
            aria-label="Abrir menú">
            <Menu size={24} />
          </button>

          {/* Navegación desktop */}
          <nav className="hidden md:flex gap-4 ml-4 items-center">
            <Link
              href="/auth/register"
              className="hover:text-primary-600 font-medium hover:scale-105 duration-300">
              Registrarse
            </Link>
            <Link
              href="/auth/login"
              className=" font-medium bg-factuCyan rounded-2xl text-white hover:bg-factuCyan/80 hover:text-white p-2 px-4 hover:scale-105 duration-300">
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-400 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="relative ml-auto w-full h-screen bg-primary-100 dark:bg-primary-900 shadow-lg px-6 py-6 flex flex-col justify-between">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4"
            aria-label="Cerrar menú">
            <X size={24} />
          </button>

          <div className="mt-10 space-y-10">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="flex flex-col font-semibold text-xl gap-14 text-center pt-10">
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                Registrarse
              </Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
            </div>
          </div>

          <div className="text-center text-sm mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;





