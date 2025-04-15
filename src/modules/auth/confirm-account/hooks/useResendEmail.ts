import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { resendCodeVerification } from "../actions/resend-confirmation-action";
import { toast } from "sonner";
export const useResendEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingEmail") || searchParams.get("email") || ""
      : "";

  const resendCodeVerificationWithEmail = resendCodeVerification.bind(
    null,
    emailFromQuery!,
  );

  const [state, dispatch, pending] = useActionState(
    resendCodeVerificationWithEmail,
    {
      errors: [],
      success: "",
    },
  );

  const handleResend = () => {
    startTransition(() => {
      dispatch();
    });
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
      router.refresh();
    }
  }, [state]);

  return {
    emailFromQuery,
    handleResend,
    pending,
  };
};

