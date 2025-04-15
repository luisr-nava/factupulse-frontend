import { User } from "./user-global.entity";

export interface Category {
  id: string;
  name: string;
}

export interface Store {
  owner: User;
  name: string;
  address: string;
  country: string;
  enumCategory: string;
  customCategory: string;
  id: string;
  categories: Category;
}

export interface StoreEntityGlobal {
  store: Store | Store[] | null;
  setStore: (store: Store) => void;
  clearStore: () => void;
  setCategoryToStore: (categories: Category) => void;
}


