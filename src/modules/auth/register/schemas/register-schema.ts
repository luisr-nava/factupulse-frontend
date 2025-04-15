import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export type RegisterValues = z.infer<typeof RegisterSchema>;
export const registerSchemaForm = z
  .object({
    name: z.string().min(1, "Por favor ingresá tu nombre"),
    email: z.string().email("El email no es válido"),
    password: z.string().min(8, "Ingresá una contraseña"),
    confirm: z.string().min(8, "Confirmá tu contraseña"),
    terms: z.boolean().refine((value) => value, {
      message: "Debés aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterFormValuesForm = z.infer<typeof registerSchemaForm>;

