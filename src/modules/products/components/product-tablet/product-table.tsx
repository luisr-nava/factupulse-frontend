import ActionsTable from "@/components/actions-table/actions-table";
import { Product } from "@/interfaces/product.interfaces";
import { Table, TableColumnsType, Tooltip } from "antd";

export default function ProductTable() {
  const columns: TableColumnsType<Product> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "descripción",
      dataIndex: "decription",
      key: "description",
      render: (description: string) => {
        return description.length > 10 ? (
          <Tooltip title={description}>
            {description.substring(0, 10)}...
          </Tooltip>
        ) : (
          <p>{description}</p>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Descuento",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Stock mínimo",
      dataIndex: "minStock",
      key: "minStock",
    },
    {
      title: "Disponible",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable: boolean) => (isAvailable ? "Sí" : "No"),
    },
    {
      title: "Historia",
      dataIndex: "modificationHistory",
      key: "modificationHistory",
      render: (modificationHistory: Product["modificationHistory"]) => {
        return (
          <div>
            {modificationHistory.length >= 1 ? (
              <div key={modificationHistory[0].shopId}>
                <p>Fecha: {modificationHistory[0].updatedAt}</p>
                <p>Usuario: {modificationHistory[0].updatedBy.name}</p>
                <p>Cambios: {JSON.stringify(modificationHistory[0].changes)}</p>
              </div>
            ) : (
              <p>No hay cambios</p>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: Product) => (
        <ActionsTable
          edit={
            () => {}
            //  onEdit?.(record)
          }
          remove={
            () => {}
            // setEmployeeToDelete(record)
          }
        />
      ),
      width: 80,
    },
  ];

  const expandedRowRender = (record: Product) => {
    return (
      <div>
        <p>Fecha de creación: {record.createdAt}</p>
        <p>Tienda: {record.shop.name}</p>
      </div>
    );
  };
  return (
    <div>
      <Table<Product>
        columns={columns}
        //   dataSource={data?.data || []}
        //   loading={isLoading}
        //   rowKey="id"
        //   pagination={{
        //     current: Number(filters.page) || 1,
        //     pageSize: Number(filters.limit) || 10,
        //     total: data?.total || 0,
        //     showSizeChanger: true,
        //     onChange: (page, pageSize) => {
        //       handlePageChange(page);
        //       handleLimitChange(pageSize);
        //     },
        //   }}
        expandable={{
          expandedRowRender,
        }}
      />
    </div>
  );
}
