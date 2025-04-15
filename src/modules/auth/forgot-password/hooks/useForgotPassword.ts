import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { forgotPassword } from "../actions/forgot-password-action";

export const useForgotPassword = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const [state, dispatch, pending] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: { email: string }) => {
    try {
      startTransition(() => {
        dispatch(values);
      });
    } catch (error) {
      toast.error("Error al enviar el correo");
    } finally {
    }
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success("Correo enviado");
      setShowSuccessMessage(true);
    }
  }, [state]);

  return {
    showSuccessMessage,
    setShowSuccessMessage,
    onFinish,
    state,
    dispatch,
    pending,
  };
};

