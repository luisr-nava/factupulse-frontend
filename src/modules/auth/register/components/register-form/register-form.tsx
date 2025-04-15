"use client";
import { useRegisterForm } from "../../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormValuesForm,
  registerSchemaForm,
} from "../../schemas/register-schema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { pending, onFinish } = useRegisterForm();

  const form = useForm<RegisterFormValuesForm>({
    resolver: zodResolver(registerSchemaForm),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      terms: false,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinish)}
        className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ejemplo@correo.com"
                  {...field}
                  disabled={pending}
                />
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={pending}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    tabIndex={-1}>
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    {...field}
                    disabled={pending}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    tabIndex={-1}>
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={pending}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer">
                  Acepto los{" "}
                  <a href="#" className="underline underline-offset-2">
                    términos y condiciones
                  </a>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppButton
          type="submit"
          disabled={pending}
          className="w-full transition-all duration-500">
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </AppButton>
      </form>
    </Form>
    // <Form
    //   form={form}
    //   layout="vertical"
    //   onFinish={onFinish}
    //   className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
    //   <Form.Item
    //     label="Nombre"
    //     name="name"
    //     rules={[{ required: true, message: "Por favor ingresá tu nombre" }]}>
    //     <Input placeholder="Juan Pérez" />
    //   </Form.Item>

    //   <Form.Item
    //     label="Correo electrónico"
    //     name="email"
    //     rules={[
    //       { required: true, message: "Por favor ingresá tu email" },
    //       { type: "email", message: "El email no es válido" },
    //     ]}>
    //     <Input placeholder="ejemplo@correo.com" />
    //   </Form.Item>

    //   <Form.Item
    //     label="Contraseña"
    //     name="password"
    //     rules={[{ required: true, message: "Ingresá una contraseña" }]}
    //     hasFeedback>
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item
    //     label="Confirmar contraseña"
    //     name="confirm"
    //     dependencies={["password"]}
    //     hasFeedback
    //     rules={[
    //       { required: true, message: "Confirmá tu contraseña" },
    //       ({ getFieldValue }) => ({
    //         validator(_, value) {
    //           if (!value || getFieldValue("password") === value) {
    //             return Promise.resolve();
    //           }
    //           return Promise.reject(new Error("Las contraseñas no coinciden"));
    //         },
    //       }),
    //     ]}>
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item
    //     name="terms"
    //     valuePropName="checked"
    //     rules={[
    //       {
    //         validator: (_, value) =>
    //           value
    //             ? Promise.resolve()
    //             : Promise.reject(new Error("Debés aceptar los términos")),
    //       },
    //     ]}>
    //     <Checkbox>
    //       Acepto los <a href="#">términos y condiciones</a>
    //     </Checkbox>
    //   </Form.Item>

    //   <Form.Item>
    //     <Button
    //       type="primary"
    //       htmlType="submit"
    //       loading={pending}
    //       className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
    //       {pending ? "Creando cuenta..." : "Crear cuenta"}
    //     </Button>
    //   </Form.Item>
    // </Form>
  );
}


