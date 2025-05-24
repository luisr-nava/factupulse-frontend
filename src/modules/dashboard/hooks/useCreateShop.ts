import { useState } from "react";
import { useCreateShopMutation } from "./mutation/useCreateShopMutation";
import { ShopFormValues } from "../interfaces";

export const useCreateShop = () => {
  const [showForm, setShowForm] = useState(false);

  const { mutate, isPending } = useCreateShopMutation();

  const onSubmit = async (values: ShopFormValues) => {
    await mutate(values);
    setShowForm(false);
  };

  return {
    showForm,
    setShowForm,
    isPending,
    onSubmit,
  };
};

