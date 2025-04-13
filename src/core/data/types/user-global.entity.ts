export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  profileImageUrl: string | null;
  mustChangePassword: boolean;
  shopId: string[] | null;
}

export interface UserEntityGlobal {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

