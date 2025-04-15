import {  StateCreator } from "zustand";
import { User, UserEntityGlobal } from "../types/user-global.entity";

const USER_ACTION_TYPES = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
};

export const useUserStoreSlice: StateCreator<
  UserEntityGlobal,
  [["zustand/devtools", never]],
  [],
  UserEntityGlobal
> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }, false, USER_ACTION_TYPES.SET_USER),
  clearUser: () => set({ user: null }, false, USER_ACTION_TYPES.CLEAR_USER),
});

