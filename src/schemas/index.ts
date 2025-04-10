import { z } from "zod";

export const SuccessResponseSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

