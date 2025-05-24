import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EmployeePayload } from "../../interfaces";
import { measureMemory } from "vm";
import { message } from "antd";
import { useEmployeeFormStore } from "../useEmployeeStore";

export const useCreateEmployeeMutation = () => {
  const closeForm = useEmployeeFormStore((s) => s.closeForm);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EmployeePayload) => {
      const res = await fetch("/api/proxy?url=/users/register-employee", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear empleado");
      return json;
    },
    onSuccess: () => {
      message.success("Empleado creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      closeForm();
    },
    onError: (error: any) => {
      message.error(error.message || "Error al crear empleado");
    },
  });
};

