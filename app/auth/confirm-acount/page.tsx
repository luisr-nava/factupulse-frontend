import { ConfirmAcount } from "@/src/modules/auth/confirm-account";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";
export const metadata: Metadata = {
  title: "Verificación de cuenta | FactuPulse",
  description: "Ingresá el código que te enviamos para activar tu cuenta.",
  robots: "noindex, nofollow",
};

export default function ConfirmAccountPage() {
  return <ConfirmAcount />;
}

