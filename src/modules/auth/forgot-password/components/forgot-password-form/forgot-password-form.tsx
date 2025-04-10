"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { forgotPassword } from "../../actions/forgot-password-action";
import { toast } from "sonner";

export default function ForgotPasswordForm({
  setShowSuccessMessage,
}: {
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [state, dispatch, pending] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  });

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      startTransition(() => {
        dispatch(values);
      });
    } catch (error) {
      toast.error("Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success("Correo enviado");
      setShowSuccessMessage(true);
    }
  }, [state]);
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
          Enviar código
        </Button>
      </Form.Item>
    </Form>
  );
}

