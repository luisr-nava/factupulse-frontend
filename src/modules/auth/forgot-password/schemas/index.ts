import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Por favor ingresá tu email" })
    .email("El email no es válido"),
});


export type ForgotPasswordValuesForm = z.infer<typeof forgotPasswordSchema>;