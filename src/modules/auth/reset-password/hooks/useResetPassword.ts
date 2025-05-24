import { useResetPasswordMutation } from "./useResetPassword.mutation";

export const useResetPassword = () => {
  const { mutate, isPending } = useResetPasswordMutation();

  const onSubmit = async (formValues: {
    password: string;
    passwordConfirm: string;
  }) => {
    const { password } = formValues;
    mutate(password);
  };

  return {
    onSubmit,
    isPending,
  };
};

