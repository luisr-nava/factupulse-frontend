import { AuthGuard } from "@/components";
import MainLayout from "@/layouts/MainLayout";

export default function SalesPage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <h1>Sales</h1>
        {/* <Pos /> */}
      </MainLayout>
    </AuthGuard>
  );
}
