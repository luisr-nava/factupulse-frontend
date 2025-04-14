import { Form } from "antd";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { registerUser } from "../actions/register-action";
import { toast } from "sonner";

export const useRegisterForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [state, dispatch, pending] = useActionState(registerUser, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: any) => {
    try {
      startTransition(() => {
        dispatch(values);
      });
      localStorage.setItem("pendingEmail", values.email);
      router.push("/auth/confirm-acount");
      form.resetFields();
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
    }
  }, [state]);
  return { state, dispatch, pending, form, onFinish };
};

