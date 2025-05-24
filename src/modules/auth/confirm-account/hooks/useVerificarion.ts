import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useVerificationMutation } from "./useVerification.mutation";
import { useResendMutation } from "./useResend.mutation";

export const useVerification = (email?: string) => {
  const { mutate, isPending, isSuccess } = useVerificationMutation();
  const emailFromQuery =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingEmail") || ""
      : "";

  const {
    mutate: resend,
    isPending: isPendingResend,
    isSuccess: isSuccessResend,
  } = useResendMutation();

  const PIN_LENGTH = 6;

  const router = useRouter();

  const [code, setCode] = useState<string[]>(Array(PIN_LENGTH).fill(""));

  const [isComplete, setIsComplete] = useState(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newToken = [...code];
    newToken[index] = value;
    setCode(newToken);

    const joined = newToken.join("");
    if (value && index < PIN_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    const allFilled = newToken.every((val) => val !== "");
    setIsComplete(allFilled);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevToken = [...code];
      prevToken[index - 1] = "";
      setCode(prevToken);
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (isComplete) {
      const token = code.join("");
      mutate(token);
      if (isSuccess) {
        localStorage.removeItem("pendingEmail");
        router.push("/auth/login");
      }
    }
  }, [isComplete]);

  const handleResend = () => {
    resend(emailFromQuery);
  };

  return {
    PIN_LENGTH,
    router,
    code,
    setCode,
    isComplete,
    setIsComplete,
    inputs,
    isPending,
    handleChange,
    handleKeyDown,
    handleResend,
    isPendingResend,
    emailFromQuery,
    resend,
  };
};


