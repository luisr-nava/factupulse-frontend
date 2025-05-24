import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { useUserSlice } from "./slices/user-global.slice";
import { UserEntityGlobal } from "./types/user-global.entity";
import { ShopEntityGlobal } from "./types/store-global.entity";
import { useShopSlice } from "./slices/store-global.slice";
import { ThemeEntityGlobal } from "./types/theme-global.entity";
import { AuthEntityGlobal } from "./types/auth-global.entity";
import { useAuthSlice } from "./slices/auth-global.slice";
import { useThemeSlice } from "./slices/theme-global.slice";

export type GlobalState = UserEntityGlobal &
  ShopEntityGlobal &
  ThemeEntityGlobal &
  AuthEntityGlobal;
export const useGlobalStore = create<GlobalState>()(
  persist(
    devtools((...a) => ({
      ...useUserSlice(...a),
      ...useShopSlice(...a),
      ...useAuthSlice(...a),
      ...useThemeSlice(...a),
    })),
    {
      name: "global-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

