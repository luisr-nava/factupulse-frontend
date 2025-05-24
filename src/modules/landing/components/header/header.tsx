import { AppButton, Footer, LinkButton, ThemeToggle } from "@/components";
import { Logo } from "@/components/logo";
import { Menu, X } from "lucide-react";
// import { AppButton } from "@/components/ui/button";
// import { AppLink } from "@/components/ui/link";
// import { Menu, X } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50  px-4 py-3 lg:py-6 flex items-center justify-between border-b shadow-lg bg-slate-100 dark:bg-primary-800">
        <Logo />

        <div className="flex items-center gap-2">
          <AppButton
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="md:hidden !px-1">
            <Menu />
          </AppButton>

          <nav className="hidden md:flex gap-4 ml-4 items-center">
            <LinkButton href="/auth/register">Registrarse</LinkButton>
            <LinkButton href="/auth/login">Iniciar sesión</LinkButton>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-transform duration-400 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="relative ml-auto w-full h-screen bg-white dark:bg-primary-900 shadow-lg px-6 py-6 flex flex-col justify-between">
          <AppButton
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 "
            aria-label="Cerrar menú">
            <X size={20} className="text-white" />
          </AppButton>

          <div className="mt-10 space-y-10">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="flex flex-col  text-xl gap-14 text-center pt-10 items-center">
              <div className="">
                <ThemeToggle />
              </div>
              <LinkButton
                href="/auth/register"
                className="w-1/2"
                onClick={() => setMenuOpen(false)}>
                Registrarse
              </LinkButton>
              <LinkButton
                href="/auth/login"
                className="w-1/2"
                onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </LinkButton>
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


