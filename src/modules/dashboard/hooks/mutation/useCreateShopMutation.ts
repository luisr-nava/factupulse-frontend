import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShopFormValues } from "../../interfaces";
import { message } from "antd";

export const useCreateShopMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ShopFormValues) => {
      const res = await fetch("/api/proxy?url=/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      return json.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-shops"] });
      onSuccess?.();
      message.success("Tienda creada correctamente");
    },
  });
};

