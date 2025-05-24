import { useUrlFilters } from "@/core/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { useSocketListener } from "@/hooks/useSocketListener";
import { useSocket } from "@/providers/socket-provider";
import { buildQueryString } from "@/utils/build-query-string";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDeleteEmployeeMutation } from "./mutations/useDeleteEmployeeMutation";
import { Employee } from "@/interfaces/employee.interfaces";

export const useEmployeesTable = () => {
  const router = useRouter();
  const [grouping, setGrouping] = useState<string[]>([]);
  const { filters, setFilter, resetFilters } = useUrlFilters();
  const {mutate: deleteEmployee, isPending: isPendingDelete} = useDeleteEmployeeMutation();
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const search = filters.search ?? "";
  const role = filters.role ?? "";

  // Debounce para búsqueda (aumenté el tiempo a 700ms para mejor rendimiento)
  const debouncedSearch = useDebounce(search, 700);

  // Sincronizar debounce con URL y resetear página

  useEffect(() => {
    if (debouncedSearch !== search) {
      setFilter("search", debouncedSearch);
      setFilter("page", 1);
    }
  }, [debouncedSearch]);

  const {
    data = { data: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees", { page, limit, search: debouncedSearch, role }],
    queryFn: async () => {
      const queryParams = {
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch.trim() }), // trim() para eliminar espacios
        ...(role && { role }),
      };

      const url = `/api/proxy?url=/users/employees&${buildQueryString(
        queryParams,
      )}`;

      const res = await fetch(url, {
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al cargar empleados");
      return res.json();
    },
    staleTime: 5000,
  });

  const socket = useSocket();

  useSocketListener(socket, [
    { event: "employee.created", handler: () => refetch() },
    { event: "employee.updated", handler: () => refetch() },
  ]);

  const handlePageChange = (newPage: number) => {
    setFilter("page", newPage);
  };

  const handleRoleChange = useCallback(
    (newRole: string) => {
      // Forzar la actualización incluso cuando el valor es vacío
      const finalRole = newRole === "" ? undefined : newRole;

      // Actualizar la URL directamente para evitar problemas de sincronización
      const newQuery = { ...router.query };

      if (finalRole === undefined) {
        delete newQuery.role;
      } else {
        newQuery.role = finalRole;
      }

      // Resetear siempre a página 1
      newQuery.page = "1";

      router.push({ pathname: router.pathname, query: newQuery }, undefined, {
        shallow: true,
        scroll: false,
      });
    },
    [router],
  );

  const handleLimitChange = (newLimit: number) => {
    const newQuery = { ...router.query };

    newQuery.limit = String(newLimit);
    newQuery.page = "1";

    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const hasActiveFilters = () => {
    const active = Object.entries(filters).filter(([key, value]) => {
      if (key === "page" || key === "limit") return false;
      if (!value) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    });
    return active.length > 0;
  };

  const handleDeleteEmployee = (employee: Employee) => {
    deleteEmployee(employee.id, {
      onSuccess: () => {
        setEmployeeToDelete(null); // lo vas a necesitar pasar desde el componente
        refetch(); // si no lo maneja el socket
      },
    });
  };

  return {
    filters,
    data,
    isLoading,
    grouping,
    setGrouping,
    handlePageChange,
    handleLimitChange,
    resetFilters,
    hasActiveFilters,
    setFilter,
    searchText: search,
    selectedRole: role,
    handleRoleChange,
    deleteEmployee,
    employeeToDelete,
    setEmployeeToDelete,
    handleDeleteEmployee,
    isPendingDelete,
  };
};







