import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export const useResetPasswordMutation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")!;

  return useMutation({
    mutationFn: async (formValues: string) => {
      console.log(formValues);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword: formValues,
          token: token,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMsg =
          Array.isArray(json?.message) && json.message.length
            ? json.message.join(", ")
            : json?.message || "Error al restablecer la contraseña";
        throw new Error(errorMsg);
      }

      return json;
    },

    onSuccess: () => {
      message.success("Contraseña restablecida con éxito");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};

