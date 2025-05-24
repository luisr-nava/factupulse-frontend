import { StateCreator } from "zustand";
import { UserEntityGlobal } from "../types/user-global.entity";
import { User } from "@/interfaces";

const USER_ACTION_TYPES = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
};

export const useUserSlice: StateCreator<
  UserEntityGlobal,
  [["zustand/devtools", never]],
  [],
  UserEntityGlobal
> = (set) => ({
  user: null,
  setUser: (user: User | null) =>
    set({ user }, false, USER_ACTION_TYPES.SET_USER),
  clearUser: () => set({ user: null }, false, USER_ACTION_TYPES.CLEAR_USER),
});

