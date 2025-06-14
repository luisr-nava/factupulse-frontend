import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

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
      message.success("Empleado eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      message.error("No se pudo eliminar el empleado.");
    },
  });
}



