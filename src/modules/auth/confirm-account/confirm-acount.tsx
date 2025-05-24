import { useState } from "react";
import { AccountVerificationForm, ResendVerificationEmail } from "./components";
import { useVerification } from "./hooks/useVerificarion";

export default function ConfirmAcount() {
  const [email, setEmail] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("pendingEmail") || ""
      : "",
  );

  const { resend } = useVerification(email);

  const handleSendResend = (newEmail: string) => {
    localStorage.setItem("pendingEmail", newEmail);
    setEmail(newEmail);
    resend(newEmail);
  };

  return (
    <div className="text-center space-y-4 mb-6 dark:text-white">
      <h1 className="text-3xl font-bold lg:text-4xl">Verificá tu cuenta</h1>
      {email ? (
        <AccountVerificationForm />
      ) : (
        <ResendVerificationEmail handleSendResend={handleSendResend} />
      )}
    </div>
  );
}

