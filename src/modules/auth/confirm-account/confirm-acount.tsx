"use client";
import { useEffect, useState } from "react";
import { AccountVerificationForm, ResendVerificationEmail } from "./components";
import { useResendEmail } from "./hooks";

export default function ConfirmAcount() {
  const { emailFromQuery } = useResendEmail();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="text-center space-y-4 mb-6">
      <h1 className="text-3xl font-bold lg:text-4xl">Verificá tu cuenta</h1>
      {emailFromQuery ? (
        <AccountVerificationForm />
      ) : (
        <ResendVerificationEmail />
      )}
    </div>
  );
}

