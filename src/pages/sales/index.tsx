import { AuthGuard } from "@/components";
import MainLayout from "@/layouts/MainLayout";

export default function SalesPage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <h1>aiksd</h1>
      </MainLayout>
    </AuthGuard>
  );
}
