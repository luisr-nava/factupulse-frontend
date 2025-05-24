import { Shop, ShopCategory } from "@/interfaces";

export interface ShopEntityGlobal {
  shops: Shop[];
  currentShop: Shop | null;

  setShops: (shop: Shop[]) => void;
  setCurrentShop: (shop: Shop) => void;
  clearShop: () => void;
}

