import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateCategoryMutation = (
  onSuccess?: (newCategory: any) => void,
) => {
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/proxy?url=/shop-category", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("No se pudo crear la categoría");
      return res.json();
    },
    onSuccess: (newCategory) => {
      message.success("Categoría creada 🎉");
      onSuccess?.(newCategory);
    },
    onError: () => {
      message.error("Error al crear la categoría");
    },
  });
};

