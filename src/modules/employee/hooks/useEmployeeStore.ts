// stores/useEmployeeFormStore.ts
import { create } from "zustand";
import { Employee } from "@/interfaces/employee.interfaces";

type FormMode = "create" | "edit";

interface EmployeeStore {
  isOpen: boolean;
  mode: FormMode;
  employee: Employee | null;
  openForm: (mode: FormMode, employee?: Employee) => void;
  closeForm: () => void;
  setEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  isOpen: false,
  mode: "create",
  employee: null,
  openForm: (mode, employee = undefined) =>
    set({ isOpen: true, mode, employee }),
  closeForm: () => set({ isOpen: false, employee: null, mode: "create" }),
  setEmployee: (employee) => set({ employee }),
}));

