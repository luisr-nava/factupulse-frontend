import { AuthGuard } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { Products } from '@/modules/products';


export default function SalesPage() {
  return (
    <AuthGuard protected>
      <MainLayout>
        <Products />
      </MainLayout>
    </AuthGuard>
  );
}
