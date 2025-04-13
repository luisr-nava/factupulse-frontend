import { useQuery } from "@tanstack/react-query";
export type ShopCategory = {
  id: string;
  name: string;
};
export const useShopCategories = () => {
  return useQuery<ShopCategory[]>({
    queryKey: ["shop-categories"],
    queryFn: async () => {
      const res = await fetch("/api/proxy?url=/shop-category");
      if (!res.ok) throw new Error("Error al obtener las categorías");
      const json = await res.json();
      return json.data; // asumimos { data: [] }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos cache
    refetchOnWindowFocus: false,
  });
};




