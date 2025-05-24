import { StateCreator } from "zustand";
import { ShopEntityGlobal } from "../types/store-global.entity";
import { Shop } from "@/interfaces";

const SHOP_ACTION_TYPE = {
  SET_SHOPS: "SET_SHOPS",
  SET_SHOP: "SET_SHOP",
  CLEAR_SHOP: "CLEAR_SHOP",
};

export const useShopSlice: StateCreator<
  ShopEntityGlobal,
  [["zustand/devtools", never]],
  [],
  ShopEntityGlobal
> = (set) => ({
  shops: [],
  currentShop: null,

  //modifiers
  setShops: (shops: Shop[]) =>
    set({ shops }, false, SHOP_ACTION_TYPE.SET_SHOPS),
  setCurrentShop: (shop: Shop) =>
    set({ currentShop: shop }, false, SHOP_ACTION_TYPE.SET_SHOP),
  clearShop: () =>
    set({ currentShop: null }, false, SHOP_ACTION_TYPE.CLEAR_SHOP),
});

