import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RegisterValues } from "../interfaces";
import { message } from "antd";

export const useRegisterMutation = () => {
  const router = useRouter();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register-owner`;

  return useMutation({
    mutationFn: async (formValues: RegisterValues) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }
      return json;
    },
    onSuccess: () => {
      message.success("Cuenta creada correctamente");

      router.push("/auth/confirm-account");
    },
    onError: (error: any) => {
      message.error(error.message || "Error al registrar el usuario");
    },
  });
};

