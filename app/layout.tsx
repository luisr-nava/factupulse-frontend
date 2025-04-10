import "antd/dist/reset.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import { ClientInit } from "@/components/shared/client-init";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FactuPulse",
  description:
    "FactuPulse es una plataforma para emprendedores y comerciantes que buscan profesionalizar su negocio sin complicarse.",
  icons: {
    icon: [{ url: "/factu-pulse.ico", type: "image/ico+xml" }],
    shortcut: "/factu-pulse.ico",
    apple: "/factu-pulse.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} select-none`}>
        <ClientInit>{children}</ClientInit>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

{
  /* <script
  dangerouslySetInnerHTML={{
    __html: `(async function() {
try {
  const theme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (!theme && prefersDark);
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
} catch (_) {}
})();`,
  }} */
}

{
  /* /> */
}

