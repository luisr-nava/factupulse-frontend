import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useRecoveryPasswordMutation = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/recovery-password`;
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMessage =
          Array.isArray(json?.message) && json.message.length
            ? json.message.join(", ")
            : json?.message || "Error al enviar el correo";
        throw new Error(errorMessage);
      }
      return json;
    },
    onSuccess: (data) => {
      message.success(data.message);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      message.error("Error al enviar el correo");
    },
  });
};


