import { IDaySpecial, IGoodThought } from '@interfaces/models';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BlockLoader } from '../UI/Loaders';

export type DaySpecialsTableProps = {
  onSelect?: (id: string) => void;
  hideAddLink?: boolean;
};
export const DaySpecialsTable = ({ onSelect, hideAddLink = false }: DaySpecialsTableProps) => {
  const [selectedId, setSelectedId] = useState(null);
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
  return (
    <>
      {isLoading && <BlockLoader />}
      {isSuccess && (
        <>
          {!hideAddLink && (
            <Link
              className="inline-block px-4 text-primary text-lg text-right"
              to="/dashboard/day-specials/add"
            >
              {t('daySpecialsTable.add')}
            </Link>
          )}

          <div className="mb-6 border border-stroke dark:border-strokedark rounded overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-b-stroke dark:border-strokedark">
                  <th className="py-4 px-4 font-medium text-black dark:text-white w-20">
                    {t('daySpecialsTable.columns.index')}
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    {t('daySpecialsTable.columns.daySpecial')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {daySpecials.length ? (
                  daySpecials.map((daySpecial: IDaySpecial, index) => {
                    return (
                      <tr
                        key={daySpecial.id}
                        className={`cursor-pointer hover:bg-sky-100 ${selectedId === daySpecial.id ? 'bg-sky-100' : ''}`}
                        onClick={() => handleSelect(daySpecial.id)}
                      >
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark w-20">
                          <p className="text-black dark:text-white text-center">{index + 1}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{daySpecial.special}</p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10}>
                      <p className="text-black dark:text-white px-6 py-8 text-center">
                        {t('daySpecialsTable.empty')}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
