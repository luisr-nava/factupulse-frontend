import { ProductPayload } from "@/modules/products/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useProductStore } from "../../useProductStore";

export const useCreateProductMutation = () => {
  const closeForm = useProductStore((s) => s.closeForm);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductPayload) => {
      const res = await fetch("/api/proxy?url=/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear producto");
      return json;
    },

    onSuccess: () => {
      message.success("Producto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeForm();
    },

    onError: (error) => {
      message.error(error.message || "Error al crear producto");
    },
  });
};

