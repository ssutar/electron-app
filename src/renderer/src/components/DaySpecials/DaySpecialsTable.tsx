import { IDaySpecial } from '@interfaces/models';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BlockLoader } from '../ui/Loaders';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTableRenderer } from '../ui/data-table-renderer';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export type DaySpecialsTableProps = {
  onSelect?: (id: string) => void;
  hideAddLink?: boolean;
};
export const DaySpecialsTable = ({ onSelect, hideAddLink = false }: DaySpecialsTableProps) => {
  const [_selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();

  const { authUser } = useAuth();

  const {
    data: daySpecials,
    isLoading,
    isSuccess,
  } = useQuery<IDaySpecial[]>({
    queryKey: ['day-specials', authUser?.id],
    queryFn: async () => {
      return window.api.getAllDaySpecials(authUser?.id || '');
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

  const { table } = useDataTable<IDaySpecial>({
    tableId: 'daySpecialsTable',
    columnIds: ['special'],
    data: daySpecials || [],
    onSelect: handleSelect,
    filterByColumnId: 'special',
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
                  <Plus /> {t('daySpecialsTable.add')}
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
