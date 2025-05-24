import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  protected?: boolean; // true = requiere login, false = redirige si ya hay login
}
export default function AuthGuard({ children, protected: isProtected = true }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (isProtected && !token) {
      router.replace("/auth/login");
    }

    if (!isProtected && token) {
      router.replace("/dashboard");
    }
  }, []);

  return <>{children}</>;
};

