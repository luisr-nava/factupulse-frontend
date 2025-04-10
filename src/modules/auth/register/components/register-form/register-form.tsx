"use client";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useActionState, useEffect, useState } from "react";
import { registerUser } from "../../actions/register-action";
import { toast } from "sonner";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useActionState(registerUser, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      startTransition(() => {
        dispatch(values);
      });
      setLoading(false);
      localStorage.setItem("pendingEmail", values.email);
      router.push("/auth/confirm-acount");
      form.resetFields();
    } catch (error) {
      toast.error("Error al registrar el usuario");
    } finally {
      setLoading(false);
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
          loading={loading}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}





