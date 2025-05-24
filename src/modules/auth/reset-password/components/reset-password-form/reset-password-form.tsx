import { AppButton } from "@/components";
import { Form, Input } from "antd";
import { useResetPassword } from "../../hooks";
import { resetConfirmPasswordRules, resetPasswordRules } from "@/constants";

export default function ResetPasswordForm() {
  const { onSubmit, isPending } = useResetPassword();

  return (
    <Form
      layout="vertical"
      className="space-y-6 w-full  px-10 md:w-1/4 my-8"
      onFinish={onSubmit}>
      <Form.Item name="password" rules={resetPasswordRules}>
        <Input.Password
          type="password"
          placeholder="Nueva contraseña"
          className="rounded-lg"
        />
      </Form.Item>
      <Form.Item name="passwordConfirm" rules={resetConfirmPasswordRules}>
        <Input.Password
          type="password"
          placeholder="Repetir nueva contraseña"
          className="rounded-lg"
        />
      </Form.Item>
      <AppButton htmlType="submit" loading={isPending}>
        {isPending ? "Restableciendo..." : "Restablecer contraseña"}
      </AppButton>
    </Form>
  );
}



