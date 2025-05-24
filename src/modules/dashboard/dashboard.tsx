import { useGlobalStore } from "@/core/store";
import { useDashboard } from "./hooks/useDashboard";
import { ModalShop } from "./components";
export default function Dashboard() {
  const { isOwner, haveStore, name } = useDashboard();
  const currentShop = useGlobalStore((state) => state.currentShop);

  return (
    <div>
      {isOwner && haveStore && !currentShop ? (
        <ModalShop name={name} isOwner={isOwner} haveStore={haveStore} />
      ) : (
        <h3>You don't have a store yet www</h3>
      )}
    </div>
  );
}

