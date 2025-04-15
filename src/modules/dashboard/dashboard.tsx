"use client";

import { spanishSpeakingCountries } from "@/src/constants";
import { useGlobalStore } from "@/src/core/store";
import { Button, Card, Form, Input, Modal, Select, Spin } from "antd";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { CategorySelect } from "./components/category-select/category-select";
import { ShopFormValues } from "./interfaces";
import { shopFormStore } from "./store/slice/shop-form-store";
import { useShopStore } from "./store";

export default function Dashboard() {
  const { user } = useGlobalStore();
  const { name, address, country, category } = useShopStore();
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(true);

  const isOwner = user?.roles[0] === "OWNER";

  const haveStore = Array.isArray(user?.shopId) && user.shopId.length > 0;

  const handleClick = () => {
    setShowForm(true);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div>
      {isOwner && !haveStore && (
        <Modal
          open={true}
          onCancel={() => {}}
          onOk={() => {}}
          footer={null}
          width={800}
          className="grid items-center justify-center gap-4 p-4 text-center">
          <h2 className="text-2xl font-bold text-center">Bienvenido!</h2>
          <p className="text-lg">
            Para comenzar a usar FactuPulse, primero debes crear una tienda
          </p>
          <div className="my-5">
            {!showForm ? (
              <Button className="size-16 " onClick={handleClick}>
                <CirclePlus className="text-factuCyan" />
              </Button>
            ) : (
              <Form<ShopFormValues>
                initialValues={{
                  name,
                  address,
                  country,
                  category,
                }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="max-w-md w-full mx-auto space-y-6 ">
                <Form.Item
                  label="Nombre de la tienda"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "El nombre de la tienda es requerido",
                    },
                    {
                      min: 5,
                      message: "El nombre debe tener al menos 5 caracteres",
                    },
                  ]}>
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="Dirección de la tienda"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "La dirección de la tienda es requerida",
                    },
                  ]}>
                  <Input placeholder="Ej: Avenida 123" />
                </Form.Item>
                <Form.Item
                  label="Pais de la tienda"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "El país de la tienda es requerido",
                    },
                  ]}>
                  <Select
                    placeholder="Seleccioná un país"
                    className="text-start"
                    options={spanishSpeakingCountries.map((country) => ({
                      label: country,
                      value: country,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Categoría de la tienda" name="category">
                  <CategorySelect />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    // loading={loading}
                    className="w-full bg-factuCyan text-white hover:!bg-factuCyan/80 transition-all duration-500">
                    Crear tienda
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

