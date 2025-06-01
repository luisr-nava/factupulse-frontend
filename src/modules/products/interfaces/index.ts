export interface ProductPayload {
  name: string;
  description: string;
  cost: number;
  categories: string[];
  shops: {
    shopId?: string;
    stock: string;
    price: string;
    discount: number;
    minStock: number;
    isAvailable: boolean;
  }[];
}

export interface CategoryPayload {
  name: string;
  shopId?: string[];
}
