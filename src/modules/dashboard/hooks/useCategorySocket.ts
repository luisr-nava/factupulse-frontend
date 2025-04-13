'use client'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:3000"); // cambiar por prod

export const useCategorySocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("category.created", (category) => {
      console.log("[WebSocket] Nueva categoría:", category);
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
    });

    return () => {
      socket.off("category.created");
    };
  }, [queryClient]);
};


