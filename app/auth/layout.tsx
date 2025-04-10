import { Footer } from "@/src/components";
import { Logo } from "@/src/components/logo";
import Link from "next/link";
import React from "react";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen select-none">
      <Link
        href="/"
        className="flex justify-center my-5 lg:justify-start lg:p-5 lg:pl-10">
        <Logo />
      </Link>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

