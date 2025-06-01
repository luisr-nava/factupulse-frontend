import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
// TODO: Bloquear si la categoria esta asignada a un producto desde el backend
// TODO: Traer las categorias cuando traiga los poductos
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/proxy?url=/product-category/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();

      if (!res.ok)
        throw new Error(json.message || "Error al eliminar categoria");
      return json;
    },
    onSuccess: () => {
      message.success("Categoria eliminada con éxito");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      message.error("No se pudo eliminar la categoria");
    },
  });
};

