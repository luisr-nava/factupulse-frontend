import { useGlobalStore } from "@/core/store";
import { Shop } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useShop = () => {
  const setShops = useGlobalStore((state) => state.setShops);
  const query = useQuery<Shop[]>({
    queryKey: ["user-shops"],
    queryFn: async () => {
      const res = await fetch("/api/proxy?url=/shop", {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al obtener las tiendas");
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setShops(query.data);
    }
  }, [query.data, setShops]);

  return query;
};


