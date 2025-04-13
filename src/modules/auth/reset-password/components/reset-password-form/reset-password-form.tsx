"use client";

import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useActionState, useEffect, startTransition } from "react";
import { resetPasswordAction } from "../../actions/reset-password-action";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [form] = Form.useForm();

  const router = useRouter();
  const searchParams = useSearchParams();


  const token = searchParams.get("token")!;

  const [state, dispatch, isPending] = useActionState(resetPasswordAction, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: { password: string }) => {
    console.log(values);
    startTransition(() => {
      dispatch({ token, newPassword: values.password });
    });
  };

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/auth/login");
    }
  }, [state, router]);

  return (
    <Form
      form={form}
      layout="vertical"
        onFinish={onFinish}
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
          loading={isPending}
          disabled={isPending}
          className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
          Restablecer contraseña
        </Button>
      </Form.Item>
    </Form>
  );
}

