import { Shop, User } from "@/interfaces";

export interface AuthEntityGlobal {
  login: (payload: {
    user: User;
    shops: Shop[];
    currentShop: Shop;
    token: string;
    token_expiration: string;
  }) => void;
  logout: () => Promise<void>;
}

