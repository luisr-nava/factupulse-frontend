import { z } from "zod";

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;


export const resetPasswordSchemaForm = z
  .object({
    password: z.string().min(1, "Ingresá una nueva contraseña"),
    confirm: z.string().min(1, "Confirmá la contraseña"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

export type ResetPasswordValuesForm = z.infer<typeof resetPasswordSchemaForm>;

