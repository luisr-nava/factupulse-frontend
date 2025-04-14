import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { resendCodeVerification } from "../actions/resend-confirmation-action";
import { toast } from "sonner";

export const useResendEmail = () => {
  const searchParams = useSearchParams();

  const [emailFromQuery, setEmailFromQuery] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email =
      searchParams.get("email") || localStorage.getItem("pendingEmail");
    setEmailFromQuery(email);
  }, [searchParams]);

  const resendCodeVerificationWithEmail = resendCodeVerification.bind(
    null,
    emailFromQuery!,
  );

  const [state, dispatch] = useActionState(resendCodeVerificationWithEmail, {
    errors: [],
    success: "",
  });

  const handleResend = () => {
    setLoading(true);
    startTransition(() => {
      dispatch();
    });
  };
  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
      setLoading(false);
    }

    if (state.success) {
      toast.success(state.success);
      setLoading(false);
    }
  }, [state]);
  
  return {
    emailFromQuery,
    loading,
    handleResend,
  };
};

