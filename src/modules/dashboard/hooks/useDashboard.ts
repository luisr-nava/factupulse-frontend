import { useGlobalStore } from "@/core/store";
import { useShop } from "./queries/useShop";

export const useDashboard = () => {
  const user = useGlobalStore((state) => state.user);
  
  const { data: shops = []} = useShop();
  
  
  const name = user?.name;
  
  const isOwner = user?.roles[0] === "OWNER";

  const haveStore =  shops.length >= 0;

  return { isOwner, haveStore, name };
};




