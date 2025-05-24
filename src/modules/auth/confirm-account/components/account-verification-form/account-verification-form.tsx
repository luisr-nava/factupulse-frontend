import { AppButton } from "@/components";
// import { useResendEmail } from "../../hooks";
import { Input, Spin } from "antd";
import { useVerification } from "../../hooks/useVerificarion";
import { useVerificationMutation } from "../../hooks";

export default function AccountVerificationForm() {
  const {
    PIN_LENGTH,
    code,
    isPending,
    inputs,
    handleKeyDown,
    handleChange,
    handleResend,
    isPendingResend,
  } = useVerification();

  return (
    <div className="relative grid place-items-center space-y-5 justify-center my-10">
      <p className="text-muted-foreground lg:text-xl">
        Ingresá el código de 6 dígitos que te enviamos por correo.
      </p>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm max-h-screen">
          <Spin size="large" />
        </div>
      )}
      <div className="flex gap-3 z-0">
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <Input
            key={i}
            maxLength={1}
            disabled={isPending}
            value={code[i] || ""}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              inputs.current[i] = el?.input ?? null;
            }}
            className="w-12 h-12 text-center text-xl border rounded-md "
          />
        ))}
      </div>
      <p className="text-muted-foreground text-sm lg:text-base">
        ¿No recibiste el código? Revisá la carpeta de spam o{" "}
        <AppButton
          disabled={isPendingResend}
          loading={isPendingResend}
          className="dark:!bg-transparent !text-primary !px-0 text-base"
          type="link"
          // size="small

          onClick={handleResend}>
          reenviá el correo
        </AppButton>
      </p>
    </div>
  );
}



