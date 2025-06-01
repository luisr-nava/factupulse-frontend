import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/proxy?url=/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      message.success("Producto eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("No se pudo eliminar el empleado.");
    },
  });
};

