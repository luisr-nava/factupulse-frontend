import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  RowSelectionState,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Info } from "lucide-react";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  noDataMessage?: string;
  rowActions?: (row: TData) => React.ReactNode;
  renderExpandedContent?: (row: TData) => React.ReactNode;
  pagination?: PaginationProps;
}

export function DataTable<TData>({
  data,
  columns,
  isLoading = false,
  noDataMessage = "No hay datos disponibles.",
  rowActions,
  renderExpandedContent,
  pagination,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [visibleExpandedRowId, setVisibleExpandedRowId] = useState<
    string | null
  >(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      expanded:
        expandedRowId || visibleExpandedRowId
          ? { [(expandedRowId || visibleExpandedRowId) as string]: true }
          : {},
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: (updater) => {
      const result = typeof updater === "function" ? updater({}) : updater;
      const key = Object.keys(result)[0];

      if (expandedRowId === key) {
        setExpandedRowId(null);
      } else {
        // Primero cerramos la fila anterior suavemente
        setExpandedRowId(null);
        // Después de 300ms (coincidiendo con la animación de salida), abrimos la nueva
        setTimeout(() => {
          setExpandedRowId(key);
        }, 300);
      }
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => typeof renderExpandedContent === "function",
    manualPagination: !!pagination,
  });

  return (
    <div className="rounded-xl border border-border shadow-sm overflow-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead className="bg-primary/50 text-muted-foreground sticky top-0 z-10 backdrop-blur-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={cn(
                    "px-4 py-3 text-left font-semibold tracking-wide",
                    index === 0 && "rounded-tl-lg",
                  )}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
              {rowActions && <th className="px-4 py-3 text-right">Acciones</th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={
                  table.getAllLeafColumns().length + (rowActions ? 1 : 0)
                }>
                <div className="flex justify-center items-center py-12">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : table.getPaginationRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={
                  table.getAllLeafColumns().length + (rowActions ? 1 : 0)
                }
                className="px-4 py-6 text-center text-muted-foreground">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            table.getPaginationRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className={cn(
                    "group border-t hover:bg-primary/10 transition-colors duration-200",
                    row.getIsSelected() || row.getIsExpanded()
                      ? "bg-primary/10"
                      : "bg-white",
                  )}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-2 text-right">
                      {rowActions(row.original)}
                    </td>
                  )}
                </tr>
                {typeof renderExpandedContent === "function" && (
                  <tr>
                    <td
                      colSpan={
                        table.getAllLeafColumns().length + (rowActions ? 1 : 0)
                      }
                      className="p-0">
                      <AnimatePresence initial={false} mode="wait">
                        {row.getIsExpanded() && (
                          <motion.div
                            key={`expand-content-${row.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                            }}>
                            <div className="relative px-6 py-5">
                              <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-md" />
                              <div className="relative z-10 rounded-xl border border-primary/20 bg-white shadow-lg px-6 py-5">
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                    <Info className="w-4 h-4" />
                                  </div>
                                  <h4 className="text-sm font-semibold text-primary">
                                    Información adicional
                                  </h4>
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  {renderExpandedContent(row.original)}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted text-sm text-muted-foreground">
          <div>
            Página {pagination.pageIndex + 1} de{" "}
            {Math.ceil(pagination.totalCount / pagination.pageSize)}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                pagination.onPageSizeChange(Number(e.target.value))
              }
              className="border rounded-md px-2 py-1 text-sm">
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  Mostrar {size}
                </option>
              ))}
            </select>
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Anterior
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
              disabled={
                pagination.pageIndex + 1 >=
                Math.ceil(pagination.totalCount / pagination.pageSize)
              }
              className="px-3 py-1 border rounded disabled:opacity-50">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

