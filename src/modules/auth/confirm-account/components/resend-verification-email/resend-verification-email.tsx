import { AppButton } from "@/components";
import { Form, Input } from "antd";
import { useVerification } from "../../hooks/useVerificarion";

interface Props {
  handleSendResend: (email: string) => void;
}
export default function ResendVerificationEmail({ handleSendResend }: Props) {
  const { isPendingResend } = useVerification();
  
  const onSubmit = (data: { email: string }) => {
    handleSendResend(data.email);
  };

  return (
    <div className="mx-auto w-full max-w-sm mt-10 space-y-4">
      <p className="text-muted-foreground lg:text-xl">
        Ingresá tu correo electrónico para reenviar el código de verificación.
      </p>
      <Form onFinish={onSubmit} className="w-full" layout="vertical">
        <Form.Item
          name="email"
          className="text-white"
          rules={[
            { required: true, message: "Por favor ingresa tu correo" },
            {
              type: "email",
              message: "Por favor ingresa un correo válido",
            },
          ]}>
          <Input
            type="email"
            placeholder="Ingresa tu correo"
            className=" rounded-lg"
          />
        </Form.Item>
        <AppButton
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isPendingResend}>
          {isPendingResend ? "Reenviando correo..." : "Reenviar correo"}
        </AppButton>
      </Form>
    </div>
  );
}

