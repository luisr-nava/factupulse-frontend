import { AuthGuard } from "@/components/auth-guard/auth-guard";
import MainLayout from "@/layouts/MainLayout";
import { Pos } from "@/modules/pos";

export default function SalesPage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <Pos />
      </MainLayout>
    </AuthGuard>
  );
}

