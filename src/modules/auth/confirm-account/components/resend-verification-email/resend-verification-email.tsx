"use client";

import { Button, Form, Input } from "antd";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { resendCodeVerification } from "../../actions/resend-confirmation-action";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ResendVerificationEmail() {
  const searchParams = useSearchParams();

  const [emailFromQuery, setEmailFromQuery] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email =
      searchParams.get("email") || localStorage.getItem("pendingEmail");
    setEmailFromQuery(email);
  }, [searchParams]);

  const resendCodeVerificationWithEmail = resendCodeVerification.bind(
    null,
    emailFromQuery!,
  );

  const [state, dispatch] = useActionState(resendCodeVerificationWithEmail, {
    errors: [],
    success: "",
  });

  const handleResend = () => {
    setLoading(true);
    startTransition(() => {
      dispatch();
    });
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => toast.error(error));
      setLoading(false);
    }

    if (state.success) {
      toast.success(state.success);
      setLoading(false);
    }
  }, [state]);

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

