import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "@/interfaces/employee.interfaces";
import { EmployeePayload } from "../../interfaces";
import { message } from "antd";
import { useEmployeeFormStore } from "../useEmployeeStore";

export const useUpdateEmployeeMutation = () => {
  const closeForm = useEmployeeFormStore((s) => s.closeForm);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: EmployeePayload; id: string }) => {
      const res = await fetch(`/api/proxy?url=/users/employee/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al actualizar el empleado");

      return json;
    },
    onSuccess: (updatedEmployee: Employee) => {
      message.success("Empleado actualizado con éxito");
      queryClient.setQueryData<Employee[]>(["employees"], (old = []) =>
        old.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp,
        ),
      );
      closeForm();
    },
    onError: (error: any) => {
      message.error(error.message || "Error al actualizar el empleado");
    },
  });
};

