import { StateCreator } from "zustand";
import { GlobalState } from "..";
import { AuthEntityGlobal } from "../types/auth-global.entity";

export const useAuthSlice: StateCreator<
  GlobalState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  AuthEntityGlobal
> = (set, get, store) => ({
  login: ({ user, shops, currentShop, token, token_expiration }) => {
    set(
      {
        user,
        shops,
        currentShop,
      },
      false,
      "LOGIN",
    );

    localStorage.setItem("token", token);
    localStorage.setItem("token_expiration", token_expiration);
  },

  logout: async () => {
    try {
      await fetch("/api/logout", { method: "POST" });

      set(
        {
          user: null,
          shops: [],
          currentShop: null,
        },
        false,
        "LOGOUT",
      );

      localStorage.removeItem("token");
      localStorage.removeItem("token_expiration");

      await store.persist?.clearStorage?.();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  },
});

