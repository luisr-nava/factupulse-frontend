import { Form, Input } from "antd";
import { useLoginMutation } from "../../hooks/useLogin.mutation";
import { AppButton } from "@/components";
import { LoginValues } from "../../interfaces";
import { loginEmailRules, loginPasswordRules } from "@/constants";

export default function LoginForm() {
  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (values: LoginValues) => mutate(values);

  return (
    <Form<LoginValues>
      onFinish={onSubmit}
      className="space-y-6 w-full  px-10 md:w-1/4 my-8">
      <Form.Item name="email" rules={loginEmailRules}>
        <Input placeholder="ejemplo@correo.com" className=" rounded-lg" />
      </Form.Item>

      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <AppButton
        loading={isPending}
        htmlType="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md">
        Ingresar
      </AppButton>
    </Form>
  );
}

