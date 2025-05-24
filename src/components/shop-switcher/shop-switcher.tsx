import { Check, LogOut, User, User2, UserCog } from "lucide-react";
import Link from "next/link";
import { Avatar, Dropdown, Menu } from "antd";
import { useDashboardMenu } from "@/hooks/useDashboardMenu";

export default function ShopSwitcher() {
  const { pathname, shops, currentShop, setCurrentShop, user, handleLogout } =
    useDashboardMenu();

  const shopMenu = (
    <Menu className="!bg-primary-900 brightness-150 shadow-2xl  ">
      {shops.map((shop) => {
        const isSelected = shop.id === currentShop?.id;
        return (
          <Menu.Item
            key={shop.id}
            disabled={isSelected}
            onClick={() => {
              if (!isSelected) setCurrentShop(shop);
            }}>
            <div className="flex items-center gap-2 !text-white">
              <span>{shop.name}</span>
              {isSelected && <Check className="w-4 h-4 " />}
            </div>
          </Menu.Item>
        );
      })}

      {shops.length < 2 && (
        <>
          <Menu.Divider />
          <Menu.Item
            key="create"
            onClick={() => {
              console.log("Abrir modal para crear tienda");
            }}>
            Crear otra tienda
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const userMenu = (
    <Menu className="!bg-primary-900 brightness-150 shadow-2xl  ">
      <Menu.Item key="profile">
        <Link href="/account" className="flex items-center gap-2 !text-white">
          <UserCog className="w-4 h-4" />
          Perfil
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <div className="flex items-center gap-2 text-red-500">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center gap-4">
      {/* Selector de tiendas */}
      <Dropdown overlay={shopMenu} trigger={["click"]} placement="bottomRight">
        <Avatar className="cursor-pointer hover:shadow-md transition">
          <span className="text-2xl">{currentShop?.name}</span>
        </Avatar>
      </Dropdown>

      {/* Usuario */}
      <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomRight">
        <Avatar className="cursor-pointer hover:shadow-md transition flex items-center">
          <User2 className="w-4 h-4" />
        </Avatar>
      </Dropdown>
    </div>
  );
}





