"use server";

import { ActionStateType } from "@/src/interfaces";
import { ResetPasswordSchema } from "../schemas";
import { ErrorResponseSchema, SuccessResponseSchema } from "@/src/schemas";

export async function resetPasswordAction(
  prevState: ActionStateType,
  formValues: { token: string; newPassword: string },
) {
  const values = ResetPasswordSchema.safeParse(formValues);
  if (!values.success) {
    return {
      errors: values.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
console.log({values});

  const url = `${process.env.API_URL}/auth/reset-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values.data),
  });
  const json = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((issue: string) => issue),
      success: "",
    };
  }
  const success = SuccessResponseSchema.parse(json);

  return {
    errors: [],
    success: success.message,
  };
}

