import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useResendMutation = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-confirmation`;

  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMessage =
          Array.isArray(json?.message) && json.message.length
            ? json.message.join(", ")
            : json?.message || "Error al reenviar código";
        throw new Error(errorMessage);
      }
      return json;
    },
    onSuccess: (_data, email) => {
      const parsedEmail = typeof email === "string" ? email : "";
      message.success("Código reenviado");
      localStorage.setItem("pendingEmail", parsedEmail);
    },
    onError: (error: any) => {
      message.error(error.message || "Error al reenviar código");
    },
  });
};


