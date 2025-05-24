import { useQuery } from "@tanstack/react-query";
export type ShopCategory = {
  id: string;
  name: string;
};
export const useShopCategories = () => {
  return useQuery<ShopCategory[]>({
    queryKey: ["shop-categories"],
    queryFn: async () => {
      const res = await fetch("/api/proxy?url=/shop-category", {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al obtener las categorías");
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};


