import { AuthGuard } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { Dashboard } from "@/modules/dashboard";

export default function DashboardPage() {
  return (
    <AuthGuard protected>
      <div className=""></div>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </AuthGuard>
  );
}


