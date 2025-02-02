import { ISubject } from '@interfaces/models';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { BlockLoader } from '@/components/ui/Loaders';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTableRenderer } from '@/components/ui/data-table-renderer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export type SubjectsTableProps = {
  onSelect?: (id: string) => void;
  hideAddLink?: boolean;
};
export const SubjectsTable = ({ onSelect, hideAddLink = false }: SubjectsTableProps) => {
  const [_selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();

  const { authUser } = useAuth();

  const {
    data: daySpecials,
    isLoading,
    isSuccess,
  } = useQuery<ISubject[]>({
    queryKey: ['subjects', authUser?.id],
    queryFn: async () => {
      return window.api.getAllSubjects(authUser?.id || '');
    },
    enabled: !!authUser?.id,
  });

  const handleSelect = (goodThoughtId) => {
    setSelectedId((prevId) => {
      const idToUpdate = prevId === goodThoughtId ? undefined : goodThoughtId;
      onSelect?.(idToUpdate);
      return idToUpdate;
    });
  };

  const { table } = useDataTable<ISubject>({
    tableId: 'subjectsTable',
    columnIds: ['title'],
    data: daySpecials || [],
    onSelect: handleSelect,
    filterByColumnId: 'title',
  });

  return (
    <>
      {isLoading && <BlockLoader />}
      {isSuccess && (
        <>
          {!hideAddLink && (
            <div className="text-right">
              <Button asChild variant={'link'}>
                <Link
                  className="inline-block px-4 text-primary text-lg text-right"
                  to="/day-specials/add"
                >
                  <Plus /> {t('subjectsTable.add')}
                </Link>
              </Button>
            </div>
          )}

          <DataTableRenderer table={table} />
        </>
      )}
    </>
  );
};
