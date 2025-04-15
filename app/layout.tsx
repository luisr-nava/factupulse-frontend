import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/shared/providers";

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} select-none`}
        suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

