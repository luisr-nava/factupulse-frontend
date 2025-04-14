"use client";
import { Button, Checkbox, Form, Input } from "antd";
import { useRegisterForm } from "../../hooks";

export default function RegisterForm() {
  const { pending, form, onFinish } = useRegisterForm();
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Por favor ingresá tu nombre" }]}>
        <Input placeholder="Juan Pérez" />
      </Form.Item>

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
        rules={[{ required: true, message: "Ingresá una contraseña" }]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar contraseña"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Confirmá tu contraseña" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Debés aceptar los términos")),
          },
        ]}>
        <Checkbox>
          Acepto los <a href="#">términos y condiciones</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={pending}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </Form.Item>
    </Form>
  );
}

