import { AuthGuard } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { Employee } from "@/modules/employee";

export default function EmployeePage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <Employee />
      </MainLayout>
    </AuthGuard>
  );
}

