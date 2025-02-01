import { IUpdate } from '@interfaces/models';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTableRenderer } from '@/components/ui/data-table-renderer';

export type UpdatesTableProps = {
  onSelect?: (id: string) => void;
  updates: IUpdate[];
  hideAddUpdatesLink?: boolean;
};

export function UpdatesTable({ updates, onSelect }: UpdatesTableProps) {
  const { table } = useDataTable<IUpdate>({
    tableId: 'updatesTable',
    columnIds: [
      'grade',
      'subject',
      'teachingMethod',
      'teachingAid',
      'boardWork',
      'objectives',
      'teacherProcedure',
      'studentProcedure',
      'onlineMedium',
      'homeWork',
    ],
    data: updates,
    onSelect,
    filterByColumnId: 'subject',
  });

  return <DataTableRenderer table={table} />;
}
