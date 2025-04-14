import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { resetPasswordAction } from "../actions/reset-password-action";
import { Form } from "antd";

export const useResetPassword = () => {
    const [form] = Form.useForm();

    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token")!;

    const [state, dispatch, pending] = useActionState(resetPasswordAction, {
      errors: [],
      success: "",
    });

    const onFinish = async (values: { password: string }) => {
      startTransition(() => {
        dispatch({ token, newPassword: values.password });
      });
    };

    useEffect(() => {
      if (state.errors) {
        state.errors.forEach((error) => {
          toast.error(error);
        });
      }
      if (state.success) {
        toast.success(state.success);
        router.push("/auth/login");
      }
    }, [state, router]);
  return {
    form,
    pending,
    onFinish,
  };
};





