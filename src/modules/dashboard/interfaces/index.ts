export interface ShopFormValues {
  name: string;
  address: string;
  country: string;
  category: string | null;
}
export interface ShopFormStore extends ShopFormValues {
  setField: <K extends keyof ShopFormValues>(
    key: K,
    value: ShopFormValues[K],
  ) => void;
  reset: () => void;

}