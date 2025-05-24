import { Form, Input } from "antd";
import { RegisterValues } from "../../interfaces";
import { useRegisterMutation } from "../../hooks";
import { AppButton } from "@/components";
import {
  registerConfirmPasswordRules,
  registerEmailRules,
  registerNameRules,
  registerPasswordRules,
} from "@/constants";

export default function RegisterForm() {
  const { mutate, isPending } = useRegisterMutation();
  const onSubmit = (values: RegisterValues) => {
    mutate(values);
    localStorage.setItem("pendingEmail", values.email);
  };
  return (
    <Form<RegisterValues>
      onFinish={onSubmit}
      className="space-y-6 w-full  px-10 md:w-1/4 my-8">
      <Form.Item name="name" rules={registerNameRules}>
        <Input placeholder="Nombre" className=" rounded-lg" />
      </Form.Item>

      <Form.Item name="email" rules={registerEmailRules}>
        <Input placeholder="correo@correo.com" className=" rounded-lg" />
      </Form.Item>

      <Form.Item name="password" rules={registerPasswordRules}>
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <Form.Item name="confirm" rules={registerConfirmPasswordRules}>
        <Input.Password placeholder="••••••••" />
      </Form.Item>
      <Form.Item name="terms" valuePropName="checked">
        <Input type="checkbox" />
        <span className="ml-2 dark:text-white">
          Acepto los términos y condiciones
        </span>
      </Form.Item>

      <AppButton
        loading={isPending}
        htmlType="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md">
        Crear cuenta
      </AppButton>
    </Form>
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(onFinish)}
    //     className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-primary-900 p-6 rounded-lg shadow">
    //     <FormField
    //       control={form.control}
    //       name="name"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Nombre</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Juan Pérez" {...field} disabled={pending} />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="email"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Email</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="ejemplo@correo.com"
    //               {...field}
    //               disabled={pending}
    //             />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="password"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Contraseña</FormLabel>
    //           <FormControl>
    //             <div className="relative">
    //               <Input
    //                 autoComplete="new-password"
    //                 type={showPassword ? "text" : "password"}
    //                 {...field}
    //                 disabled={pending}
    //                 className="pr-10"
    //                 placeholder="••••••••"
    //               />
    //               <button
    //                 type="button"
    //                 onClick={() => setShowPassword((prev) => !prev)}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
    //                 tabIndex={-1}>
    //                 {showPassword ? (
    //                   <EyeOff className="w-4 h-4" />
    //                 ) : (
    //                   <Eye className="w-4 h-4" />
    //                 )}
    //               </button>
    //             </div>
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="confirm"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Confirmar contraseña</FormLabel>
    //           <FormControl>
    //             <div className="relative">
    //               <Input
    //                 autoComplete="new-password"
    //                 placeholder="••••••••"
    //                 type={showConfirm ? "text" : "password"}
    //                 {...field}
    //                 disabled={pending}
    //                 className="pr-10"
    //               />
    //               <button
    //                 type="button"
    //                 onClick={() => setShowConfirm((prev) => !prev)}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
    //                 tabIndex={-1}>
    //                 {showConfirm ? (
    //                   <EyeOff className="w-4 h-4" />
    //                 ) : (
    //                   <Eye className="w-4 h-4" />
    //                 )}
    //               </button>
    //             </div>
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="terms"
    //       render={({ field }) => (
    //         <FormItem>
    //           <div className="flex items-center space-x-2">
    //             <Checkbox
    //               id="terms"
    //               checked={field.value}
    //               onCheckedChange={field.onChange}
    //               disabled={pending}
    //             />
    //             <label
    //               htmlFor="terms"
    //               className="text-sm text-muted-foreground cursor-pointer">
    //               Acepto los{" "}
    //               <a href="#" className="underline underline-offset-2">
    //                 términos y condiciones
    //               </a>
    //             </label>
    //           </div>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <AppButton
    //       type="submit"
    //       disabled={pending}
    //       className="w-full transition-all duration-500">
    //       {pending ? "Creando cuenta..." : "Crear cuenta"}
    //     </AppButton>
    //   </form>
    // </Form>
  );
}

