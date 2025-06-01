import { create } from "zustand";

type FormMode = "create" | "edit";

interface Category {
  id: string;
  name: string
}

interface CategoryStore {
  isOpen: boolean;
  mode: FormMode;
  category: Category | null;
  openFormCategory: (mode: FormMode, category?: Category) => void;
  closeFormCategory: () => void;
  setCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  isOpen: false,
  mode: "create",
  category: null,
  openFormCategory: (mode, category) => set({ isOpen: true, mode, category }),
  closeFormCategory: () => set({ isOpen: false, mode: "create", category: null }),
  setCategory: (category) => set({ category }),
}));
