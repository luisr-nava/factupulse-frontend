import { AppButton } from "@/components";
import { PlusOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Products() {
  const router = useRouter();
  const { category } = router.query;

  const [view, setView] = useState<"Listado de productos" | "Categorias">(
    "Listado de productos",
  );

  // Sync con la URL (solo este setea el estado)
  useEffect(() => {
    setView(category !== undefined ? "Categorias" : "Listado de productos");
  }, [category]);

  const handleChange = (newView: string) => {
    const isCategory = newView === "Categorias";
    router.push(isCategory ? "/products?category" : "/products", undefined, {
      shallow: true,
    });
  };

  return (
    <div className="space-y-4 dark:text-white">
      <div className="flex justify-between items-center px-9">
        <h2 className="text-2xl font-semibold">Productos</h2>
      </div>

      <Segmented<string>
        options={["Listado de productos", "Categorias"]}
        value={view}
        onChange={handleChange}
      />

      {view === "Listado de productos" ? (
        <div>
          <AppButton icon={<PlusOutlined />}>Crear Producto</AppButton>
          <p>🛒 Mostrando listado de productos</p>
        </div>
      ) : (
        <div>
          <div className="flex">
            <AppButton icon={<PlusOutlined />}>Crear Categoria</AppButton>
          </div>
          <p>📦 Mostrando categorías</p>
        </div>
      )}
    </div>
  );
}

