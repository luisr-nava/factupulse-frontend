"use client";

import { Button, Form, Input } from "antd";
import { useResendEmail } from "../../hooks";

export default function ResendVerificationEmail() {
  const { emailFromQuery, loading, handleResend } = useResendEmail();

  return emailFromQuery ? (
    <>
      <p className="text-muted-foreground text-sm lg:text-base">
        ¿No recibiste el código? Revisá la carpeta de spam o{" "}
        <Button
          disabled={loading}
          className="!text-factuCyan font-medium text-sm lg:text-base p-0"
          type="link"
          onClick={handleResend}>
          reenviá el correo
        </Button>
      </p>
    </>
  ) : (
    <Form onFinish={handleResend}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Ingresa un correo válido",
          },
        ]}>
        <Input placeholder="Tu correo electrónico" />
      </Form.Item>
      <Button htmlType="submit">Reenviar correo</Button>
    </Form>
  );
}

