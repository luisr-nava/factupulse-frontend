import { useGlobalStore } from "@/core/store";
import { Employee } from "@/interfaces/employee.interfaces";
import { useCreateEmployeeMutation } from "./mutations/useCreateEmployeeMutation";
import { useUpdateEmployeeMutation } from "./mutations/useUpdateEmployeeMutation";
import { useState } from "react";
import { useEmployeeStore } from "./useEmployeeStore";
import { EmployeePayload } from "../interfaces";

export const useEmployeeForm = (employee?: Employee) => {
  const currentShop = useGlobalStore((s) => s.currentShop);
  const isOpen = useEmployeeStore((s) => s.isOpen);
  const closeForm = useEmployeeStore((s) => s.closeForm);
  const createMutation = useCreateEmployeeMutation();
  const updateMutation = useUpdateEmployeeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: EmployeePayload) => {
    const dataTransformed = {
      ...data,
      shopIds: [currentShop!.id],
    };

    if (employee?.id) {
      updateMutation.mutate({ data: dataTransformed, id: employee.id });
    } else {
      createMutation.mutate(dataTransformed);
    }
  };

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const handleCancel = () => {
    if (!isOpen) return;
    setShowCancelDialog(true);
  };

  return {
    onSubmit,
    isPending,
    showCancelDialog,
    setShowCancelDialog,
    handleCancel,
    closeForm,
  };
};

