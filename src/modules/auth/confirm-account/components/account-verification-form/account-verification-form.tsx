"use client";

import { Spinner } from "@/components/ui/spinner";
import { useAccountVerification, useResendEmail } from "../../hooks";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/ui/button";

export default function AccountVerificationForm() {
  const { handleChange, handleKeyDown, inputs, pending, PIN_LENGTH, code } =
    useAccountVerification();
  const { handleResend } = useResendEmail();

  return (
    <div className="relative grid place-items-center space-y-5 justify-center my-10">
      <p className="text-muted-foreground lg:text-xl">
        Ingresá el código de 6 dígitos que te enviamos por correo.
      </p>
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spinner className="size-14" />
        </div>
      )}
      <div className="flex gap-3 z-0">
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <Input
            key={i}
            maxLength={1}
            value={code[i] || ""}
            disabled={pending}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            className="w-10 h-10 text-center text-lg p-0 font-medium"
          />
        ))}
      </div>
      <p className="text-muted-foreground text-sm lg:text-base">
        ¿No recibiste el código? Revisá la carpeta de spam o{" "}
        <AppButton
          disabled={pending}
          className="text-primary bg-transparent border-none shadow-none hover:opacity-70 font-medium text-sm lg:text-base p-0 transition-all duration-500"
          onClick={handleResend}>
          reenviá el correo
        </AppButton>
      </p>
    </div>
  );
}

