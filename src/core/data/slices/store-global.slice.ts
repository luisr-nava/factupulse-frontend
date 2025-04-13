import { StateCreator } from "zustand";
import { Store, StoreEntityGlobal } from "../types/store-global.entity";

const STORE_ACTION_TYPE = {
  SET_STORE: "SET_STORE",
  CLEAR_STORE: "CLEAR_STORE",
};

export const useStoreSlice: StateCreator<
  StoreEntityGlobal,
  [["zustand/devtools", never]],
  [],
  StoreEntityGlobal
> = (set) => ({
  store: null,
  setStore: (store: Store) =>
    set({ store }, false, STORE_ACTION_TYPE.SET_STORE),
  clearStore: () => set({ store: null }, false, STORE_ACTION_TYPE.CLEAR_STORE),


  setCategoryToStore: (category) =>
    set((state) => {
      if (!state.store || Array.isArray(state.store)) return state;
      return {
        store: {
          ...state.store,
          category, // ← asignamos directamente
        },
      };
    }),
});

