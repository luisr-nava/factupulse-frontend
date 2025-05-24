import { useState } from "react";
import { useRecoveryPasswordMutation } from "./useRecoveryPassword.mutation";

export const useForgotPassword = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { mutate, isPending, isSuccess, error } = useRecoveryPasswordMutation({
    onSuccess: () => {
      setShowSuccessMessage(true);
    },
  });

  const onSubmit = (data: { email: string }) => {
    mutate(data.email);
  };

  return {
    showSuccessMessage,
    setShowSuccessMessage,
    isPending,
    onSubmit,
  };
};

