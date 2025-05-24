import { Button, Form, Input } from "antd";
import { CategorySelect } from "../category-select";
import { AppButton } from "@/components";
import { useState } from "react";
import { ShopFormValues } from "../../interfaces";

interface CreateShopFormProps {
  onSubmit: (values: ShopFormValues) => Promise<void>;
  isPending: boolean;
}
export default function CreateShopForm({
  onSubmit,
  isPending,
}: CreateShopFormProps) {
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="name"
        label="Nombre de la tienda"
        rules={[
          {
            required: true,
            message: "El nombre de la tienda es obligatorio",
          },
        ]}>
        <Input placeholder="Ej: El Almacén" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Dirección de la tienda"
        rules={[
          {
            required: true,
            message: "La dirección de la tienda es obligatorio",
          },
        ]}>
        <Input placeholder="Ej: Avenida 123" />
      </Form.Item>

      <Form.Item
        name="country"
        label="País"
        rules={[
          {
            required: true,
            message: "El país es obligatorio",
          },
        ]}>
        <Input placeholder="Ej: El Almacén" />
      </Form.Item>

      <Form.Item
        name="category"
        label="Categoria"
        rules={[
          {
            required: true,
            message: "La categoría es obligatoria",
          },
        ]}>
        <CategorySelect
          isCustomCategory={isCustomCategory}
          setIsCustomCategory={setIsCustomCategory}
        />
      </Form.Item>
      <div className="grid justify-end">
        {!isCustomCategory && (
          <Button
            onClick={() => setIsCustomCategory(true)}
            className="self-end  !text-primary">
            + Crear nueva categoría
          </Button>
        )}
      </div>

      <AppButton
        loading={isPending}
        htmlType="submit"
        className="w-full !bg-primary rounded-lg">
        Crear tienda
      </AppButton>
    </Form>
  );
}

