import { create } from "zustand";

type FormMode = "create" | "edit";

interface Category {
  id: string;
  name: string;
}

interface CategoryStore {
  isOpenFormCategory: boolean;
  mode: FormMode;
  category: Category | null;
  openFormCategory: (mode: FormMode, category?: Category) => void;
  closeFormCategory: () => void;
  setCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  isOpenFormCategory: false,
  mode: "create",
  category: null,
  
  openFormCategory: (mode, category) =>
    set({ isOpenFormCategory: true, mode, category }),
  closeFormCategory: () =>
    set({ isOpenFormCategory: false, mode: "create", category: null }),
  setCategory: (category) => set({ category }),
}));
