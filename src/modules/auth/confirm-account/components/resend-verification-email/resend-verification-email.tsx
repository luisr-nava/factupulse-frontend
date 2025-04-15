"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useResendEmail } from "../../hooks";
import { AppButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResendFormValues, resendSchema } from "../../schema";
import { useEffect } from "react";

export default function ResendVerificationEmail() {
  const { handleResend, pending } = useResendEmail();
  const form = useForm<ResendFormValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email:
        typeof window !== "undefined"
          ? localStorage.getItem("pendingEmail") || ""
          : "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.email?.trim()) {
        localStorage.setItem("pendingEmail", value.email.trim());
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="mx-auto w-full max-w-sm mt-10 space-y-4">
      <p className="text-muted-foreground lg:text-xl">
        Ingresá tu correo electrónico para reenviar el código de verificación.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResend)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Tu correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AppButton
            disabled={pending}
            className="w-full hover:scale-105 transition-all duration-300"
            type="submit">
            {pending ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4 text-white" />
                Reenviando correo...
              </div>
            ) : (
              "Reenviar correo"
            )}
          </AppButton>
        </form>
      </Form>
    </div>
  );
}

