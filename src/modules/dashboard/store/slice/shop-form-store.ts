import { StateCreator } from "zustand";
import { ShopFormStore } from "../../interfaces";

const SHOP_FORM_STORE = {};

export const shopFormStore: StateCreator<
  ShopFormStore,
  [["zustand/devtools", never]],
  [],
  ShopFormStore
> = (set) => ({
  name: "",
  address: "",
  country: "",
  category: null,
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  reset: () =>
    set({
      name: "",
      address: "",
      country: "",
      category: null,
    }),
});

