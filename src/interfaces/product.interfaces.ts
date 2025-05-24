export interface Product {
  productId: string;
  name: string;
  description: string;
  cost: string;
  createdAt: string;
  shop: {
    id: string;
    name: string;
  };
  stock: number;
  price: string;
  sku: string;
  discount: string;
  minStock: number;
  isAvailable: boolean;
  modificationHistory: ModificationHistory[];
}

export interface ModificationHistory {
  shopId: string;
  changes: {
    sku?: Change<string>;
    price?: Change<number>;
    stock?: Change<number>;
    discount?: Change<number>;
    minStock?: Change<number>;
    isAvailable?: Change<boolean>;
  };
  updatedAt: string;
  updatedBy: {
    id: string;
    name: string;
  };
}

export interface Change<T> {
  before: T | null;
  after: T;
}

