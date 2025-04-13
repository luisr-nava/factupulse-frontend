import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserEntityGlobal } from "./types/user-global.entity";
import { useUserStoreSlice } from "./slices/user-global.slice";
import { StoreEntityGlobal } from "./types/store-global.entity";
import { useStoreSlice } from "./slices/store-global.slice";

export type GlobalState = UserEntityGlobal & StoreEntityGlobal;

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (...a) => ({
        ...useUserStoreSlice(...a),
        ...useStoreSlice(...a),
      }),
      {
        name: "global-store",
      },
    ),
    { name: "global-store-devtools" },
  ),
);




