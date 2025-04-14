"use client";
import { Button, Form, Input } from "antd";
import { useLoginForm } from "../../hooks/useLoginForm";
export default function LoginForm() {
  const { state, dispatch, pending, onFinish, form } = useLoginForm();
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
          loading={pending}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          {pending ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </Form.Item>
    </Form>
  );
}

