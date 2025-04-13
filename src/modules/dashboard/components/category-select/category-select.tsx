"use client";
import { useGlobalStore } from "@/src/core/data";
import { Button, Input, message, Select } from "antd";
import { useCategorySocket } from "../../hooks/useCategorySocket";
import { ShopCategory, useShopCategories } from "../../hooks/queries/useShopCategories";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../hooks/useCreateCategoryMutation";

export const CategorySelect = () => {
 const store = useGlobalStore((s) => s.store);
 const setCategoryToStore = useGlobalStore((s) => s.setCategoryToStore);
 const { data: categories = [], isLoading } = useShopCategories();
 const [isCustomCategory, setIsCustomCategory] = useState(false);
 const [newCategoryName, setNewCategoryName] = useState("");
  useCategorySocket();

   const { mutate: createCategory, isPending } = useCreateCategoryMutation(
     (newCategory) => {
       setCategoryToStore(newCategory);
       setIsCustomCategory(false);
       setNewCategoryName("");
     },
   );

   const handleChange = (value: string) => {
     const cat = categories.find((c: ShopCategory) => c.id === value);
     if (cat) setCategoryToStore(cat);
   };

   const handleCreate = () => {
     const name = newCategoryName.trim();
     if (!name) return message.warning("El nombre no puede estar vacío");
     createCategory(name);
   };

  return  !isCustomCategory ? (
    <div className="flex flex-col gap-2">
      <Select
        placeholder="Seleccioná una categoría"
        loading={isLoading}
        className="text-start"
        onChange={handleChange}
        options={categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))}
      />
      <Button type="dashed" onClick={() => setIsCustomCategory(true)} className="w-full">
        + Crear nueva categoría
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Escribí el nombre de la nueva categoría"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onPressEnter={handleCreate}
        disabled={isPending}
      />
      <div className="flex justify-between">
        <Button onClick={() => setIsCustomCategory(false)} type="default">
          Cancelar
        </Button>
        <Button type="primary" loading={isPending} onClick={handleCreate}>
          Crear categoría
        </Button>
      </div>
    </div>
  );
};






