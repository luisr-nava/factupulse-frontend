import { z } from "zod";

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .length(6, { message: "Token no valido" });

export const EmailSchema = z
  .string({ message: "Correo no valido" })
  .email({ message: "Correo no valido" });

