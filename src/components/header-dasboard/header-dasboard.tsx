import { Dispatch, SetStateAction } from "react";
import { Logo } from "../logo";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ShopSwitcher } from "../shop-switcher";
import { ThemeToggle } from "../theme-toggle";

interface HeaderDasboardProps {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}
export default function HeaderDasboard({
  setMobileMenuOpen,
}: HeaderDasboardProps) {
  return (
    <header className="dark:bg-primary-900  w-full h-16 px-4 flex items-center justify-between relative z-50">
      <Link href="/dashboard">
        <div className="flex items-center">
          <Logo />
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-4 ">
        <ShopSwitcher />
        <ThemeToggle />
      </div>

      <button
        className="md:hidden absolute right-4"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Abrir menú de navegación">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}


