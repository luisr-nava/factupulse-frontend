import { Product } from "@/interfaces/product.interfaces";
import { create } from "zustand";

type FormMode = "create" | "edit";

interface ProductStore {
  isOpen: boolean;
  mode: FormMode;
  product: Product | null;
  openForm: (mode: FormMode, product?: Product) => void;
  closeForm: () => void;
  setProduct: (product: Product) => void;

}