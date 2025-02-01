import { IGoodThought } from '@interfaces/models';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Card } from '../ui/Card';
import { BlockLoader } from '../ui/Loaders';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTableRenderer } from '../ui/data-table-renderer';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export type GoodThoughtsTableProps = {
  onSelect?: (id: string) => void;
  hideAddLink?: boolean;
};
export const GoodThoughtsTable = ({ onSelect, hideAddLink = false }: GoodThoughtsTableProps) => {
  const [selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();

  const { authUser } = useAuth();

  const {
    data: goodThoughts,
    isLoading,
    isSuccess,
  } = useQuery<IGoodThought[]>({
    queryKey: ['good-thoughts', authUser?.id],
    queryFn: async () => {
      return window.api.getAllGoodThoughts(authUser?.id || '');
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

  const { table } = useDataTable<IGoodThought>({
    tableId: 'goodThoughtsTable',
    columnIds: ['thought'],
    data: goodThoughts || [],
    onSelect: handleSelect,
    filterByColumnId: 'thought',
  });

  return (
    <>
      {isLoading && <BlockLoader />}
      {isSuccess && (
        <>
          {!hideAddLink && (
            <div className="text-right">
              <Button asChild variant={'link'}>
                <Link to={`/good-thoughts/add`}>
                  <Plus /> {t('goodThoughtsTable.add')}
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
