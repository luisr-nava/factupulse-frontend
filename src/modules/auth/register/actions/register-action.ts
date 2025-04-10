"use server";

import { ErrorResponseSchema } from "@/src/schemas";
import { RegisterSchema, RegisterValues } from "../schemas/register-schema";
import { ActionStateType } from "@/src/interfaces";

export async function registerUser(
  prevState: ActionStateType,
  formValues: RegisterValues,
) {
  const user = RegisterSchema.safeParse(formValues);

  if (!user.success) {
    return {
      errors: user.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/users/register-owner`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user.data),
  });

  const json = await req.json();

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }

  return {
    errors: [],
    success: "Usuario registrado correctamente",
  };
}

