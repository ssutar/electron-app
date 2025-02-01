import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { t } from 'i18next';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Input } from '@/components/ui/input';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';

import { RowData } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    tableId: string;
    filterByColumnId?: string;
    date?: string;
  }
}

export const DataTableRenderer = <T,>({ table }: { table: TableType<T> }) => {
  const {
    tableId,
    filterByColumnId = '',
    date = '',
  } = table.options.meta || {
    tableId: '',
    filterByColumnId: '',
    date: '',
  };
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder={t(`${tableId}.filterBy`)}
          value={(table.getColumn(filterByColumnId)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(filterByColumnId)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <span className="hidden sm:inline-flex">{t(`${tableId}.columnsSelector`)}</span>{' '}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="sm:hidden">{t(`${tableId}.columnsSelector`)}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="sm:hidden" />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const style = ['select', 'actions'].includes(header.id)
                    ? { width: `${header.getSize()}px` }
                    : {};
                  return (
                    <TableHead key={header.id} style={style}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  {t(`${tableId}.empty`, { date })}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
