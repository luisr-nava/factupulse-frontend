import { useEffect, useState } from "react";
import { Select, Input, Tooltip, Button, Spin } from "antd";
import { BadgeCheck, XCircle } from "lucide-react";
import { useShopCategories } from "../../hooks/queries/useShopCategories";
import { useCreateCategoryMutation } from "../../hooks/mutation/useCreateCategoryMutation";
import { toast } from "sonner";

const { Option } = Select;

interface CategorySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onPendingChange?: (isPending: boolean) => void;
  isCustomCategory: boolean;
  setIsCustomCategory: (value: boolean) => void;
}

export default function CategorySelect({
  value,
  onChange,
  onPendingChange,
  isCustomCategory,
  setIsCustomCategory,
}: CategorySelectProps) {
  const { data: categories = [], isLoading } = useShopCategories();

  const [newCategoryName, setNewCategoryName] = useState("");

  const { mutate: createCategory, isPending } = useCreateCategoryMutation(
    (newCategory) => {
      onChange?.(newCategory.id);
      setNewCategoryName("");
      setIsCustomCategory(false);
    },
  );

  useEffect(() => {
    onPendingChange?.(isPending || isCustomCategory);
  }, [isPending, isCustomCategory]);

  const handleChange = (val: string) => {
    onChange?.(val);
  };

  const handleCreate = () => {
    const name = newCategoryName.trim();
    if (!name) return toast.warning("El nombre no puede estar vacío");
    createCategory(name);
  };

  if (isCustomCategory) {
    return (
      <div className="flex items-center">
        <Input
          placeholder="Nombre de categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          disabled={isPending}
        />
        <Tooltip title="Cancelar">
          <Button
            icon={<XCircle />}
            className="!text-red-600 hover:scale-105 transition-all duration-700"
            onClick={() => setIsCustomCategory(false)}
            disabled={isPending}
          />
        </Tooltip>
        <Tooltip title="Crear categoría">
          <Button
            className="!text-primary hover:scale-105 transition-all duration-700"
            icon={<BadgeCheck />}
            onClick={handleCreate}
            loading={isPending}
            disabled={isPending || newCategoryName.trim().length === 0}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="grid">
      <Select
        value={value}
        showSearch
        onChange={handleChange}
        placeholder="Seleccioná una categoría"
        loading={isLoading}
        allowClear
        disabled={isLoading}>
        {categories.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

