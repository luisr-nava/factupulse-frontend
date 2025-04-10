"use client";

import { Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
      const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <Form
      form={form}
      layout="vertical"
    //   onFinish={onFinish}
      className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
      <Form.Item
        label="Nueva contraseña"
        name="password"
        rules={[{ required: true, message: "Ingresá una nueva contraseña" }]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar contraseña"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Confirmá la contraseña" },
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        //   loading={loading}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          Restablecer contraseña
        </Button>
      </Form.Item>
    </Form>
  );

}



