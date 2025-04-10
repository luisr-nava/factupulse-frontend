"use client";

import { useThemeStore } from "@/src/core/store/theme-store";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
const ClientInit = ({ children }: Props) => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
};

export default ClientInit;
