"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClientInit } from "../client-init";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ClientInit>{children}</ClientInit>
    </QueryClientProvider>
  );
};

// <StyleProvider hashPriority="high">
// {/* <ConfigProvider> */}
// {/* </ConfigProvider> */}
// </StyleProvider>

