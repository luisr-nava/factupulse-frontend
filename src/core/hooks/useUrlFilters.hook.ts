import { useRouter } from "next/router";
import { useCallback } from "react";

export function useUrlFilters() {
  const router = useRouter();
  const pathname = router.pathname;

  const filters = router.query as Record<string, string>;

  const setFilter = useCallback(
    (key: string, value?: string | number) => {
      const newQuery = { ...router.query };

      if (value === undefined || value === "") {
        delete newQuery[key];
      } else {
        newQuery[key] = String(value);
      }

      router.push({ pathname, query: newQuery }, undefined, {
        shallow: true,
        scroll: false,
      });
    },
    [router, pathname],
  );

  const resetFilters = useCallback(() => {
    router.push(
      { pathname, query: { page: "1", limit: "10" } }, // Solo mantener paginación
      undefined,
      { shallow: true, scroll: false },
    );
  }, [router, pathname]);

  return { filters, setFilter, resetFilters };
}
