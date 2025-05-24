import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateCategoryMutation = (
  onSuccess?: (newCategory: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/proxy?url=/shop-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ esto es lo que faltaba
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("No se pudo crear la categoría");
      return res.json();
    },
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
      message.success(`Haz creado la categoría ${newCategory.name} `);
      onSuccess?.(newCategory);
    },
    onError: () => {
      message.error("Error al crear la categoría");
    },
  });
};

