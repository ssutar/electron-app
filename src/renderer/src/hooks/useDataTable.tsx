import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type UseDataTableProps<T extends { id: string }> = {
  tableId: string;
  columnIds: string[];
  data: T[];
  onSelect?: (id: string) => void;
  filterByColumnId?: string;
  date?: string;
};

export const useDataTable = <T extends { id: string }>({
  tableId,
  columnIds,
  data,
  onSelect,
  filterByColumnId,
  date,
}: UseDataTableProps<T>) => {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<T>[] = useMemo(
    () => [
      {
        id: 'select',
        header: () => <div className="text-center w-8">&nbsp;</div>,
        size: 2,
        cell: ({ row }) => (
          <div className="text-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label={t(`${tableId}.columns.selectRow`)}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columnIds.map((columnId) => ({
        accessorKey: columnId,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t(`${tableId}.columns.${columnId}`)} />
        ),
      })),
      {
        id: 'actions',
        size: 80,
        enableHiding: false,
        header: () => (
          <div className="text-center w-16">{t(`${tableId}.columns.actions.actionLabel`)}</div>
        ),
        cell: () => {
          return (
            <div className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">{t(`${tableId}.columns.actions.openMenu`)}</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {t(`${tableId}.columns.actions.actionLabel`)}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t(`${tableId}.columns.actions.edit`)}</DropdownMenuItem>
                  <DropdownMenuItem>{t(`${tableId}.columns.actions.delete`)}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [tableId, columnIds],
  );

  const table = useReactTable({
    getRowId: (row) => row.id,
    meta: { tableId, filterByColumnId, date },
    data,
    columns,
    enableMultiRowSelection: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updaterFn: Updater<RowSelectionState>) => {
      const selection = typeof updaterFn === 'function' ? updaterFn(rowSelection) : updaterFn;
      const [id] = Object.keys(selection);
      onSelect?.(id);
      setRowSelection(updaterFn);
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return { table, columns };
};
