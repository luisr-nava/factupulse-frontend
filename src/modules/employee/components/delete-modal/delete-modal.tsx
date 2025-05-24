import { Modal } from "antd";
import { Employee } from "@/interfaces/employee.interfaces";
import { AppButton } from "@/components";

interface DeleteEmployeeModalProps {
  employee: Employee | null;
  setEmployee: (e: Employee | null) => void;
  onConfirm: (employee: Employee) => void;
  isPendingDelete: boolean;
}

export default function DeleteEmployeeModal({
  employee,
  setEmployee,
  onConfirm,
  isPendingDelete,
}: DeleteEmployeeModalProps) {
  return (
    <Modal
      open={!!employee}
      centered
      footer={
        <div className="flex justify-end gap-3">
          <AppButton
            className=" text-white px-4 py-2 rounded-md"
            disabled={isPendingDelete}
            onClick={() => setEmployee(null)}>
            Cancelar
          </AppButton>
          <AppButton
            loading={isPendingDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:!bg-red-900"
            onClick={() => {
              if (employee) onConfirm(employee);
            }}>
            Sí, eliminar
          </AppButton>
        </div>
      }>
      <div className="grid">
        <h4 className="text-center text-2xl font-bold mb-3">
          Eliminar empleado
        </h4>
        <p>
          Estás por eliminar a{" "}
          <strong className="text-foreground">{employee?.name}</strong>. Esta
          acción no se puede deshacer.
        </p>
      </div>
    </Modal>
  );
}

