/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employee } from "@/interfaces/employee.interfaces";
import { useEffect, useRef } from "react";
import {
  Input,
  InputRef,
  Select,
  Table,
  TableColumnsType
} from "antd";
import { useEmployeesTable } from "../../hooks/useEmployeesTable";
import {
  Search, User,
  Pencil,
  Trash2
} from "lucide-react";
import { AppButton } from "@/components";
import DeleteEmployeeModal from "../delete-modal/delete-modal";
import Image from "next/image";

export default function EmployeesTable({
  onEdit,
}: {
  onEdit?: (employee: Employee) => void;
}) {
  const {
    data, // <- ahora sí usamos los empleados reales
    isLoading,
    filters,
    setFilter,
    handlePageChange,
    handleLimitChange,
    resetFilters,
    hasActiveFilters,
    searchText,
    selectedRole,
    handleRoleChange,
    employeeToDelete,
    setEmployeeToDelete,
    handleDeleteEmployee,
    isPendingDelete,
  } = useEmployeesTable();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchText]);

  const columns: TableColumnsType<Employee> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => {
        const roleMap: Record<string, string> = {
          MANAGER: "Encargado",
          EMPLOYEE: "Empleado",
          OWNER: "Dueño",
        };

        return roles.map((r) => roleMap[r] || r).join(", ");
      },
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: Employee) => (
        <div className="flex items-center gap-2">
          <AppButton
            onClick={() => onEdit?.(record)}
            className="text-primary hover:text-primary-600 transition-colors">
            <Pencil className="w-4 h-4" />
          </AppButton>
          <AppButton
            onClick={() => setEmployeeToDelete(record)}
            className="text-destructive hover:text-destructive-foreground transition-colors bg-red-700 hover:!bg-red-800 duration-300">
            <Trash2 className="w-4 h-4" />
          </AppButton>
        </div>
      ),
      width: 80,
    },
  ];

  const expandedRowRender = (record: Employee) => {
    const format = (value?: string | null) => value?.replace(/"/g, "") || "-";

    return (
      <div className="bg-primary/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground shadow-sm border">
        <div className="flex items-center gap-4 col-span-1 md:col-span-2">
          {record.profileImageUrl ? (
            <Image
              src={record.profileImageUrl}
              alt={record.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-900/10  flex items-center justify-center text-gray-500 border">
              <User className="w-5 h-5" />
            </div>
          )}
          <div>
            <p className="text-xl font-semibold text-foreground">
              {format(record.name)}
            </p>
            <p className="text-base text-muted-foreground">
              {format(record.email)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-muted">DNI:</p>
          <p className="font-medium">{format(record.dni)}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-muted">Teléfono:</p>
          <p className="font-medium">{format(record.phone)}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-muted">Dirección:</p>
          <p className="font-medium">{format(record.address)}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-muted">
            Fecha de contratación:
          </p>
          <p className="font-medium">
            {record.hireDate
              ? new Date(record.hireDate.replace(/"/g, "")).toLocaleDateString()
              : "-"}
          </p>
        </div>
        <div>
          <p className="text-base font-semibold text-muted">
            Contacto de emergencia:
          </p>
          <p className="font-medium">{format(record.emergencyContact)}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-muted">Notas:</p>
          <p className="font-medium">{format(record.notes)}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex items-center gap-4 mb-4 w-full md:w-2/3">
          <Input
            className="w-1/2"
            value={searchText}
            ref={inputRef}
            prefix={<Search className="size-4 text-gray-200" />}
            onChange={(e) => setFilter("search", e.target.value)}
            placeholder="Buscar empleados..."
          />
          <Select
            className="w-1/2"
            value={selectedRole || ""}
            onChange={(value) => handleRoleChange(value)}>
            <option value="">Todos los roles</option>
            <option value="EMPLOYEE">Empleado</option>
            <option value="MANAGER">Gerente</option>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters() && (
            <AppButton onClick={() => resetFilters()}>
              Limpiar filtros
            </AppButton>
          )}
        </div>
      </div>
      <Table<Employee>
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: Number(filters.page) || 1,
          pageSize: Number(filters.limit) || 10,
          total: data?.total || 0,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            handlePageChange(page);
            handleLimitChange(pageSize);
          },
        }}
        expandable={{
          expandedRowRender,
        }}
      />

      <DeleteEmployeeModal
        employee={employeeToDelete}
        setEmployee={setEmployeeToDelete}
        onConfirm={(employee) => handleDeleteEmployee(employee)}
        isPendingDelete={isPendingDelete}
      />
    </div>
  );
}




