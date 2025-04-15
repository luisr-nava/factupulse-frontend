"use client";
import { useGlobalStore } from "@/src/core/store";
import { Button, Input, message, Select, Tooltip } from "antd";
import { useCategorySocket } from "../../hooks/useCategorySocket";
import {
  ShopCategory,
  useShopCategories,
} from "../../hooks/queries/useShopCategories";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../hooks/useCreateCategoryMutation";
import { BadgeCheck, CircleX } from "lucide-react";

export const CategorySelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { data: categories = [], isLoading } = useShopCategories();
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { mutate: createCategory, isPending } = useCreateCategoryMutation(
    (newCategory) => {
      onChange?.(newCategory.id); // actualizar el campo del form
      setNewCategoryName("");
      setIsCustomCategory(false);
    },
  );

  const handleChange = (val: string) => {
    onChange?.(val);
  };

  const handleCreate = () => {
    const name = newCategoryName.trim();
    if (!name) return message.warning("El nombre no puede estar vacío");
    createCategory(name);
  };
  return !isCustomCategory ? (
    <div className="flex flex-col gap-2">
      <Select
        showSearch
        placeholder="Seleccioná una categoría"
        value={value ?? undefined}
        onChange={handleChange}
        loading={isLoading}
        options={categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))}
      />
      <Button
        type="dashed"
        onClick={() => setIsCustomCategory(true)}
        className="w-full">
        + Crear nueva categoría
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Nombre de categoría"
        onPressEnter={handleCreate}
        disabled={isPending}
        className="flex-1"
      />
      <Tooltip title="Cancelar">
        <Button
          onClick={() => setIsCustomCategory(false)}
          className="!p-0 w-9 h-9 flex items-center justify-center text-red-400 hover:!text-red-700 hover:!border-none">
          <CircleX className="w-5 h-5" />
        </Button>
      </Tooltip>
      <Tooltip title="Crear categoría">
        <Button
          loading={isPending}
          onClick={handleCreate}
          className="!p-0 w-9 h-9 flex items-center justify-center bg-factuCyan text-white hover:!bg-factuCyan/80">
          <BadgeCheck className="w-5 h-5" />
        </Button>
      </Tooltip>
    </div>
  );
};

