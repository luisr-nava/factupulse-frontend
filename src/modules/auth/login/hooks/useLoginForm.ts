import { useGlobalStore } from "@/src/core/data";
import { Form } from "antd";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { loginUser } from "../actions/login-action";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const setUser = useGlobalStore((state) => state.setUser);

  const [state, dispatch, pending] = useActionState(loginUser, {
    errors: [],
    success: "",
    user: null,
  });

  const onFinish = async (values: any) => {
    try {
      startTransition(() => {
        dispatch(values);
      });
    } catch {
      toast.error("Error al iniciar sesión");
    } finally {
    }
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success("Inicio de sesión exitoso");
      setUser(state.user);
      router.push("/dashboard");
    }
  }, [state, router]);

  return { state, dispatch, pending, onFinish, form };
};

