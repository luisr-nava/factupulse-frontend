import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { registerUser } from "../actions/register-action";
import { toast } from "sonner";

export const useRegisterForm = () => {
  const router = useRouter();

  const [state, dispatch, pending] = useActionState(registerUser, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: any) => {
    console.log(values);

    startTransition(() => {
      dispatch(values);
    });
    try {
      localStorage.setItem("pendingEmail", values.email);
    } catch (error) {
      toast.error("Error al registrar el usuario");
    }
  };
  
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success("Usuario registrado correctamente");
      router.push("/auth/confirm-acount");
    }
  }, [state]);

  return { state, dispatch, pending, onFinish };
};

