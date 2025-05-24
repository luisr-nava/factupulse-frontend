import { Footer } from "@/components";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen select-none">
      <Link
        href="/"
        className="flex justify-center my-5 lg:justify-start lg:p-5 lg:pl-10 w-fit">
        <Logo />
      </Link>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

