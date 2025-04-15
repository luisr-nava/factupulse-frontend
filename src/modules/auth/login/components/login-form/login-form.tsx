"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginForm } from "../../hooks/useLoginForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
export default function LoginForm() {
  const loginSchema = z.object({
    email: z.string().email({ message: "El email no es válido" }),
    password: z.string().min(1, "Ingresá tu contraseña"),
  });

  type LoginData = z.infer<typeof loginSchema>;

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { pending, onFinish } = useLoginForm();
  const onSubmit = async (data: LoginData) => {
    console.log("🟢 Login data:", data);
    onFinish(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md w-full mx-auto space-y-6 bg-background p-6 rounded-lg shadow">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@correo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppButton
          type="submit"
          disabled={pending}
          className="w-full hover:scale-105 transition-all duration-300">
          {pending ? (
            <div className="flex items-center gap-2">
              <Spinner className="h-4 w-4 text-white" />
              Iniciando sesión...
            </div>
          ) : (
            "Iniciar sesión"
          )}
        </AppButton>
      </form>
    </Form>
  );
}

