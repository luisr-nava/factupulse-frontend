import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

