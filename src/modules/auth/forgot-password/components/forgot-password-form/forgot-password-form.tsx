import { AppButton } from "@/components";
import { Form, Input } from "antd";
import { useForgotPassword } from "../../hooks";
interface ForgotPasswordFormProps {
  isPending: boolean;
  onSubmit: (data: { email: string }) => void;
}
export default function ForgotPasswordForm({
  isPending,
  onSubmit,
}: ForgotPasswordFormProps) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="email"
        className="mt-6"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese su correo electrónico",
          },
          {
            type: "email",
            message: "Por favor, ingrese un correo electrónico válido",
          },
        ]}>
        <Input placeholder="Correo electrónico" className="rounded-lg" />
      </Form.Item>
      <AppButton htmlType="submit" loading={isPending}>
        {isPending ? "Enviando código..." : "Enviar código"}
      </AppButton>
    </Form>
  );
}

