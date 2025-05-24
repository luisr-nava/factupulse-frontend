import { User } from "@/interfaces";

export interface UserEntityGlobal {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

