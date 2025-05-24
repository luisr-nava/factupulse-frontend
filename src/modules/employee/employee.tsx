import { useEmployee } from "./hooks/useEmployee";
import EmployeeForm from "./components/employee-form/employee-form";
import EmployeesTable from "./components/employees-table/employees-table";
import { AppButton } from "@/components";

export default function Employee() {
  const { mode, employee, openForm, isOpen } = useEmployee();

  return (
    <div className="space-y-4 dark:text-white">
      {!isOpen ? (
        <>
          <div className="flex justify-between items-center px-9 ">
            <h2 className="text-2xl font-semibold">Empleados</h2>
            <AppButton
              onClick={() => openForm("create")}
              className="!bg-primary-800 text-white px-5 py-2 rounded-md dark:hover:bg-primary-700 dark:hover:text-white">
              Crear empleado
            </AppButton>
          </div>
          <EmployeesTable onEdit={(emp) => openForm("edit", emp)} />
        </>
      ) : (
        <div className="grid gap-8">
          <h2 className="text-2xl font-semibold">
            {mode === "edit" ? "Editar empleado" : "Crear nuevo empleado"}
          </h2>
          <EmployeeForm employee={employee!} />
        </div>
      )}
    </div>
  );
}



