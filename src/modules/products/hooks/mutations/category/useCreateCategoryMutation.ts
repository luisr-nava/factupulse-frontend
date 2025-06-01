import { CategoryPayload } from "@/modules/products/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategoryPayload) => {
      const res = await fetch("/api/proxy?url=/product-category", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear categoria");
      return json;
    },
    onSuccess: () => {
      message.success("Categoria creada con éxito");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      message.error(error.message || "Error al crear categoria");
    },
  });
};

