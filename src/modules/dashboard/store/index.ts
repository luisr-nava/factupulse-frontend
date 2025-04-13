import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { shopFormStore } from "./slice/shop-form-store";
import { ShopFormStore } from "../interfaces";

export type Shop = ShopFormStore;
export const useShopStore = create<Shop>()(
  devtools((...a) => ({
    ...shopFormStore(...a),
  })),
);


