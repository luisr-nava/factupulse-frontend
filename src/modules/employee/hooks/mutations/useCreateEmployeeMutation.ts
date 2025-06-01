import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeePayload } from "../../interfaces";
import { message } from "antd";
import { useEmployeeStore } from "../useEmployeeStore";

export const useCreateEmployeeMutation = () => {
  const closeForm = useEmployeeStore((s) => s.closeForm);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EmployeePayload) => {
      const res = await fetch("/api/proxy?url=/users/register-employee", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear empleado");
      return json;
    },
    onSuccess: () => {
      message.success("Empleado creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      closeForm();
    },
    onError: (error) => {
      message.error(error.message || "Error al crear empleado");
    },
  });
};

