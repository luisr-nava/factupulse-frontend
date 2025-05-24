import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/core/store";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { LoginValues } from "../interfaces";

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useGlobalStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (formValues: LoginValues) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMsg =
          Array.isArray(json?.message) && json.message.length
            ? json.message.join(", ")
            : json?.message || "Error al iniciar sesión";
        throw new Error(errorMsg);
      }

      const expiresAt = Date.now() + 4 * 60 * 60 * 1000;
      localStorage.setItem("token", json.token);
      localStorage.setItem("token_expiration", expiresAt.toString());

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`,
        {
          headers: {
            Authorization: `Bearer ${json.token}`,
          },
        },
      );
      if (!userRes.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      const userJson = await userRes.json();

      return userJson;
    },

    onSuccess: (user) => {
      setUser(user);
      router.push("/dashboard");
      message.success("¡Bienvenido!");
    },

    onError: (error: any) => {
      message.error(error.message || "Error al iniciar sesión");
    },
  });
};

