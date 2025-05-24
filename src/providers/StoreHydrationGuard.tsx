import { useGlobalStore } from "@/core/store";
import { useEffect, useState } from "react";

export const StoreHydrationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
   const [hydrated, setHydrated] = useState(false);

   useEffect(() => {
     const unsubscribe = useGlobalStore.persist?.onFinishHydration?.(() => {
       useGlobalStore.setState(useGlobalStore.getState());
       setHydrated(true);
     });

     if (useGlobalStore.persist?.hasHydrated?.()) {
       useGlobalStore.setState(useGlobalStore.getState());
       setHydrated(true);
     }

     return () => {
       unsubscribe?.();
     };
   }, []);

   if (!hydrated) return <div>Cargando...</div>;

   return <>{children}</>;
};





