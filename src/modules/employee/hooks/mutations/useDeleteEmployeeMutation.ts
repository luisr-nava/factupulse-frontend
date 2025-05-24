import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/proxy?url=/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      //   await axios.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      toast.success("Empleado eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("No se pudo eliminar el empleado.");
    },
  });
}



