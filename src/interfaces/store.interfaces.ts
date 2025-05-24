import { User } from "./";

export interface ShopCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  owner: User;
  category: ShopCategory;
}


