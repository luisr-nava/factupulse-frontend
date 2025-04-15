"use client";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks";
import { forgotPasswordSchema, ForgotPasswordValuesForm } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const { onFinish, pending } = useForgotPassword();
  const form = useForm<ForgotPasswordValuesForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinish)}
        className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <AppButton type="submit" disabled={pending}>
          {pending ? "Enviando código..." : "Enviar código"}
        </AppButton>
      </form>
    </Form>
  );
}

