import { AppButton } from "@/components";
import {
  registerEmployeeAddressRules,
  registerEmployeeDocumentRules,
  registerEmployeeEmailRules,
  registerEmployeeFullNameRules,
  registerEmployeePhoneRules,
  registerEmployeeRoleRules,
} from "@/constants";
import { Employee } from "@/interfaces/employee.interfaces";
import { DatePicker, Form, Input, Select } from "antd";
import { useEmployeeForm } from "../../hooks/useEmployeeForm";
import CancelModal from "../cancel-modal/cancel-modal";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function EmployeeForm({ employee }: { employee?: Employee }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        fullName: employee.name,
        ...employee,
        role: employee.roles?.[0] ?? undefined,
        hireDate: employee.hireDate
          ? dayjs(employee.hireDate.replace(/"/g, ""))
          : undefined,
      });
    }
  }, [employee, form]);
  const {
    onSubmit,
    isPending,
    showCancelDialog,
    setShowCancelDialog,
    handleCancel,
    closeForm,
  } = useEmployeeForm(employee);
  console.log(employee);

  return (
    <>
      <CancelModal
        showCancelDialog={showCancelDialog}
        setShowCancelDialog={setShowCancelDialog}
        closeForm={closeForm}
      />
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onFinish={onSubmit}>
        <div className="col-span-full">
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            Datos personales
          </h3>
        </div>
        <Form.Item
          label="Nombre completo"
          name="fullName"
          rules={registerEmployeeFullNameRules}>
          <Input placeholder="Juan Pérez" type="text" />
        </Form.Item>

        <Form.Item label="DNI" name="dni" rules={registerEmployeeDocumentRules}>
          <Input placeholder="33.333.333" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={registerEmployeeEmailRules}>
          <Input placeholder="correo@correo.com" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={registerEmployeePhoneRules}>
          <Input placeholder="123456789" />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="address"
          className="md:col-span-2"
          rules={registerEmployeeAddressRules}>
          <Input placeholder="Calle 123" />
        </Form.Item>

        <div className="col-span-full mt-1">
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            Datos laborales
          </h3>
        </div>

        <Form.Item
          label="Rol"
          name="role"
          rules={registerEmployeeRoleRules}
          className="md:col-span-1">
          <Select
            placeholder="Gerente"
            allowClear
            options={[
              { label: "Empleado", value: "EMPLOYEE" },
              { label: "Encargado", value: "MANAGER" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Fecha de ingreso"
          name="hireDate"
          className="md:col-span-1">
          <DatePicker placeholder="01/01/2024" className="w-full" />
        </Form.Item>
        <Form.Item label="Salario" name="salary" className="md:col-span-1">
          <Input placeholder="100000" type="number" />
        </Form.Item>

        {/* Otros */}
        <div className="col-span-full mt-1">
          <h3 className="text-xl font-bold mb-2 dark:text-white">Otros</h3>
        </div>
        <Form.Item label="Contacto de emergencia" name="emergencyContact">
          <Input placeholder="Nombre y teléfono" />
        </Form.Item>
        <Form.Item label="Imagen de perfil (URL)" name="profileImageUrl">
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item label="Notas" name="notes" className="md:col-span-2">
          <Input.TextArea placeholder="Notas adicionales" rows={3} />
        </Form.Item>
        <div className="flex col-span-full gap-6 mb-5 justify-between">
          <AppButton
            htmlType="button"
            disabled={isPending}
            className="bg-red-800 hover:!bg-red-900  w-1/3 text-lg"
            onClick={handleCancel}>
            Cancelar
          </AppButton>
          <AppButton
            htmlType="submit"
            className="w-1/3 text-lg"
            loading={isPending}>
            {isPending ? "Guardando..." : "Guardar"}
          </AppButton>
        </div>
      </Form>
    </>
  );
}


