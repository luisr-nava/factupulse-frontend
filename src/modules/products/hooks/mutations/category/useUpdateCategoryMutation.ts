import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCategoryStore } from "../../useCategoryStore";
import { message } from "antd";

export const useUpdateCategoryMutation = () => {
  const closeFormCategory = useCategoryStore((s) => s.closeFormCategory);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, id }: { name: string; id: string }) => {
      const res = await fetch(`/api/proxy?url=/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al actualizar categoría");
      return json;
    },
    onSuccess: () => {
      message.success("Categoría actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeFormCategory();
    },
    onError: (error) => {
      message.error(error.message || "Error al actualizar categoría");
    },
  });
};

