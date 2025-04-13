import { z } from "zod";

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

