import { useEmployeeStore } from "./useEmployeeStore";

export const useEmployee = () => {
  const isOpen = useEmployeeStore((s) => s.isOpen);
  const mode = useEmployeeStore((s) => s.mode);
  const employee = useEmployeeStore((s) => s.employee);
  const openForm = useEmployeeStore((s) => s.openForm);

  return {
    mode,
    employee,
    openForm,
    isOpen,
  };
};

