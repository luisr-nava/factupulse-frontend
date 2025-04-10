"use server";

import { ActionStateType } from "@/src/interfaces";
import { ErrorResponseSchema } from "@/src/schemas";
import { LoginSchema, LoginValues } from "../schemas";
import { cookies } from "next/headers";

export async function loginUser(
  prevState: ActionStateType,
  formValues: LoginValues,
) {
  const user = LoginSchema.safeParse(formValues);

  if (!user.success) {
    return {
      errors: user.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/login`;

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

  const cookieStore = await cookies();

  cookieStore.set("token", json.token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return {
    errors: [],
    success: "¡Bienvenido!",
  };
}

