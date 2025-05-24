import { Avatar, Button, Modal, Spin, Tooltip } from "antd";
import { useCreateShop } from "../../hooks/useCreateShop";
import { useShop } from "../../hooks/queries/useShop";
import { useGlobalStore } from "@/core/store";
import { CirclePlus } from "lucide-react";
import { CreateShopForm } from "../create-shop-form";

interface ModalShopProps {
  haveStore: boolean;
  isOwner: boolean;
  name?: string;
}
export default function ModalShop({
  haveStore,
  isOwner,
  name,
}: ModalShopProps) {
  const { showForm, setShowForm, isPending, onSubmit } = useCreateShop();
  const { data: shops = [], isLoading } = useShop();
  const currentShop = useGlobalStore((state) => state.currentShop);
  const handleCreateShop = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <Modal
      open={isOwner && haveStore && !currentShop}
      footer={null}
      centered
      width={600}
      closable={false}
      className="!bg-primary">
      <div className="grid justify-center items-center p-4">
        <h2 className="text-2xl text-center">
          ¡Hola {name}, bienvenido a FactuPulse!
        </h2>
        <div className="">
          <h3>
            {showForm
              ? "Completá los datos de tu tienda para comenzar a usar FactuPulse."
              : !haveStore
              ? "Antes de comenzar, creá tu primera tienda para organizar todo desde el inicio."
              : "Podés gestionar o agregar más tiendas según tus necesidades comerciales."}
          </h3>
        </div>
        {!showForm ? (
          isLoading ? (
            <div className="flex justify-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5 px-3">
              {shops.map((shop) => (
                <Tooltip
                  key={shop.id}
                  placement="bottom"
                  title={
                    <div className="grid gap-0">
                      <p className="m-0">
                        <strong>Nombre:</strong> {shop.name}
                      </p>
                      <p className="m-0">
                        <strong>Dirección:</strong> {shop.address}
                      </p>
                      <p className="m-0">
                        <strong>País:</strong> {shop.country}
                      </p>
                      <p className="m-0">
                        <strong>Categoría:</strong> {shop.category.name}
                      </p>
                    </div>
                  }>
                  <Avatar
                    className="cursor-pointer hover:scale-105 transition-all duration-500"
                    size={52}
                    onClick={() =>
                      useGlobalStore.setState({ currentShop: shop })
                    }>
                    {shop.name}
                  </Avatar>
                </Tooltip>
              ))}
              {shops.length < 2 && (
                <Tooltip title="Crear Tienda">
                  <Button
                    className="size-12 hover:scale-105 !border-none transition-all duration-500 shadow-none p-0 text-primary hover:!text-primary-600"
                    onClick={handleCreateShop}>
                    <CirclePlus className="size-12" />
                  </Button>
                </Tooltip>
              )}
            </div>
          )
        ) : (
          <CreateShopForm onSubmit={onSubmit} isPending={isPending} />
        )}
      </div>
    </Modal>
  );
}

