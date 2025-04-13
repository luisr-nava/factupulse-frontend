"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { loginUser } from "../../actions/login-action";
import { useGlobalStore } from "@/src/core/data";

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const setUser = useGlobalStore((state) => state.setUser);

  const [state, dispatch] = useActionState(loginUser, {
    errors: [],
    success: "",
    user: null,
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      startTransition(() => {
        dispatch(values);
      });
    } catch {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: "Por favor ingresá tu email" },
          { type: "email", message: "El email no es válido" },
        ]}>
        <Input placeholder="ejemplo@correo.com" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Ingresá tu contraseña" }]}>
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
}

