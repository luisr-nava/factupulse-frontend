"use client";

import { spanishSpeakingCountries } from "@/src/constants";
import { useGlobalStore } from "@/src/core/data";
import { Button, Card, Form, Input, Modal, Select, Spin } from "antd";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { CategorySelect } from "./components/category-select/category-select";

export default function Dashboard() {
  const user = useGlobalStore((state) => state.user);
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(true);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const isOwner = user?.roles[0] === "OWNER";

  const haveStore = Array.isArray(user?.shopId) && user.shopId.length > 0;
  
  const handleClick = () => {
    setShowForm(true);
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
              <Form
                form={form}
                layout="vertical"
                // onFinish={onFinish}
                className="max-w-md w-full mx-auto space-y-6 ">
                <CategorySelect />
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
                    {
                      min: 10,
                      message: "La dirección debe tener al menos 10 caracteres",
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
                    className="text-start">
                    {spanishSpeakingCountries.map((country) => (
                      <Select.Option key={country} value={country}>
                        {country}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Categoría de la tienda"
                  name="category"
                  rules={[
                    { required: true, message: "La categoría es obligatoria" },
                  ]}>
                  <Select
                    placeholder="Seleccioná una categoría"
                    className="text-start">
                    {/* {storeCategories.map((category) => (
                      <Select.Option
                        key={category.value}
                        value={category.value}>
                        {category.label}
                      </Select.Option>
                    ))} */}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Categoría de la tienda"
                  name="category"
                  rules={[
                    { required: true, message: "La categoría es obligatoria" },
                  ]}>
                  {!isCustomCategory ? (
                    <div className="flex flex-col gap-2">
                      <Select
                        placeholder="Seleccioná una categoría"
                        className="text-start">
                        {/* {storeCategories.map((category) => (
                          <Select.Option
                            key={category.value}
                            value={category.value}>
                            {category.label}
                          </Select.Option>
                        ))} */}
                      </Select>

                      <Button
                        type="dashed"
                        onClick={() => setIsCustomCategory(true)}
                        className="w-full">
                        + Crear nueva categoría
                      </Button>
                    </div>
                  ) : (
                    <Input
                      placeholder="Escribí el nombre de la nueva categoría"
                      className="w-full"
                    />
                  )}
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

