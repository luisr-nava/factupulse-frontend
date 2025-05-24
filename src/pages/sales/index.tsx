import { AuthGuard } from "@/components/auth-guard/auth-guard";
import MainLayout from "@/layouts/MainLayout";
import { Sales } from "@/modules/sales";

export default function SalesPage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <Sales />
      </MainLayout>
    </AuthGuard>
  );
}

