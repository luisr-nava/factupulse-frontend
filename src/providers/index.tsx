import { useTheme } from "@/core/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, App as AntdApp } from "antd";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { lightTheme, darkTheme } from "@/theme/themeConfig";
import { StoreHydrationGuard } from "./StoreHydrationGuard";
import { SocketProvider } from "./socket-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  const { isDarkMode, initializeTheme } = useTheme();

  const [queryClient] = useState(() => new QueryClient());

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode],
  );

  useEffect(() => {
    initializeTheme();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StoreHydrationGuard>
        <SocketProvider>
          <ConfigProvider theme={theme}>
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </SocketProvider>
      </StoreHydrationGuard>
    </QueryClientProvider>
  );
}

