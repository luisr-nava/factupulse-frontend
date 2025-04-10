"use server";

import { ErrorResponseSchema, SuccessResponseSchema } from "@/src/schemas";
import { ActionStateType } from "../../../../interfaces/index";
import { TokenSchema } from "../schema";

export async function confirmAccount(
  token: string,
  prevState: ActionStateType,
) {
  const confirmToken = TokenSchema.safeParse(token);

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const url = `${process.env.API_URL}/auth/verification-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: confirmToken.data }),
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

