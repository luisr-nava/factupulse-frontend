import { AuthGuard } from "@/components";
import { Login } from "@/modules/auth/login";

export default function LoginPage() {
  return (
    <AuthGuard protected={false}>
      <Login />
    </AuthGuard>
  );
}

