"use client";
import { Button, Form, Input } from "antd";
import { useForgotPassword } from "../../hooks";

export default function ForgotPasswordForm() {
  const { form, onFinish, pending } = useForgotPassword();
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={pending}
          disabled={pending}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          {!pending ? "Enviar código" : "Enviando código..."}
        </Button>
      </Form.Item>
    </Form>
  );
}



