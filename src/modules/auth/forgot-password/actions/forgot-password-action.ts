"use server";

import { ErrorResponseSchema, SuccessResponseSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/interfaces";
import { ForgotPasswordSchema, ForgotPasswordValues } from "../schemas";

export async function forgotPassword(
  prevState: ActionStateType,
  formValues: ForgotPasswordValues,
) {
  const email = ForgotPasswordSchema.safeParse(formValues);

  if (!email.success) {
    return {
      errors: email.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/recovery-password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email.data),
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


