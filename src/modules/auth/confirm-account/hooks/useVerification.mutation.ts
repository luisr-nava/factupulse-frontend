import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/router";

export const useVerificationMutation = () => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/verification-account`;
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const json = await res.json();

      if (!res.ok) {
        const errorMessage =
          Array.isArray(json?.message) && json.message.length
            ? json.message.join(", ")
            : json?.message || "Error al verificar cuenta";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      message.success("Cuenta verificada con éxito");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      message.error(error.message || "Error al verificar cuenta");
    },
  });
};

