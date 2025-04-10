"use server";

import { ErrorResponseSchema, SuccessResponseSchema } from "@/src/schemas";
import { ActionStateType } from "../../../../interfaces/index";
import { EmailSchema, TokenSchema } from "../schema";
type ResendResult = {
  success: string;
  errors: string[];
};
export async function resendCodeVerification(
  email: string,
  prevState: ActionStateType,
): Promise<ResendResult> {
  const confirmEmail = EmailSchema.safeParse(email);

  if (!confirmEmail.success) {
    return {
      errors: confirmEmail.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const url = `${process.env.API_URL}/auth/resend-confirmation`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: confirmEmail.data }),
  });

  const json = await req.json();

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);

    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }

  const success = SuccessResponseSchema.parse(json);

  return {
    errors: [],
    success: success.message,
  };
}







