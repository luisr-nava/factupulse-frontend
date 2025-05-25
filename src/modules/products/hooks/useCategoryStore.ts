import { create } from "zustand";

type FormMode = "create" | "edit";

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryStore {
  isOpen: boolean;
  mode: FormMode;
  category: Category | null;
  openForm: (mode: FormMode, category?: Category) => void;
  closeForm: () => void;
  setCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  isOpen: false,
  mode: "create",
  category: null,
  openForm: (mode, category) => set({ isOpen: true, mode, category }),
  closeForm: () => set({ isOpen: false, mode: "create", category: null }),
  setCategory: (category) => set({ category }),
}));
