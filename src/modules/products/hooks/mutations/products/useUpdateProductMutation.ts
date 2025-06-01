import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "../../useProductStore";
import { ProductPayload } from "../../../interfaces";
import { message } from "antd";

export const useUpdateProductMutation = () => {
  const closeForm = useProductStore((s) => s.closeForm);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: ProductPayload; id: string }) => {
      const res = await fetch(`/api/proxy?url=/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al actualizar producto");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Producto actualizado correctamente");
      closeForm();
    },
    onError: (error) => {
      message.error(error.message || "Error al actualizar producto");
    },
  });
};

