import { useGlobalStore } from "@/core/store";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useDashboardMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const currentShop = useGlobalStore((s) => s.currentShop);
  const shops = useGlobalStore((s) => s.shops);
  const setCurrentShop = useGlobalStore((s) => s.setCurrentShop);
  const user = useGlobalStore((s) => s.user);
  const logout = useGlobalStore((s) => s.logout);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/auth/login");
  }, [logout, router]);

  return {
    pathname,
    isShopOpen,
    setIsShopOpen,
    isUserOpen,
    setIsUserOpen,
    currentShop,
    shops,
    setCurrentShop,
    user,
    handleLogout,
  };
};

