import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import AppProviders from "@/providers";
import AuthLayout from "@/layouts/AuthLayout";
import { FC, ReactNode } from "react";

export default function App({ Component, pageProps, router }: AppProps) {
  const isAuthRoute = router.pathname.startsWith("/auth");
  const Layout: FC<{ children: ReactNode }> = isAuthRoute
    ? AuthLayout
    : ({ children }) => <>{children}</>;

  return (
    <AppProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}

