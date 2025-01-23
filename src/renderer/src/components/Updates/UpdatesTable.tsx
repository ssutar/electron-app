import { IUpdate } from '@interfaces/models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type UpdatesTableProps = {
  onSelect?: (id: string) => void;
  updates: IUpdate[];
  hideAddUpdatesLink?: boolean;
  emptyState?: React.ReactNode;
};

export const UpdatesTable = ({
  updates,
  onSelect,
  hideAddUpdatesLink = false,
  emptyState = undefined,
}: UpdatesTableProps) => {
  const [selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();

  const handleSelect = (updateId) => {
    setSelectedId(updateId);
    onSelect?.(updateId);
  };

  console.log({ updates });

  return (
    <div className="mb-6 border border-stroke dark:border-strokedark rounded overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-b-stroke dark:border-strokedark">
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.grade')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.subject')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.teachingMethod')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.teachingAid')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.boardWork')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.objectives')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.teacherProcedure')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.studentProcedure')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.onlineMedium')}
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              {t('updatesTable.columns.homeWork')}
            </th>
          </tr>
        </thead>
        <tbody>
          {updates.length ? (
            updates.map((up: IUpdate) => {
              return (
                <tr
                  key={up.id}
                  className={`cursor-pointer hover:bg-blue-100/15 ${selectedId === up.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(up.id)}
                >
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.grade}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.subject}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.teachingMethod}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.teachingAid}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.boardWork}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.objectives}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.teacherProcedure}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.studentProcedure}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.onlineMedium}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{up.homeWork}</p>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10}>
                <p className="text-black dark:text-white px-6 py-8 text-center">{emptyState}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!hideAddUpdatesLink && (
        <Link className="inline-block px-4 py-6 text-primary text-lg" to="/dashboard/add-updates">
          {t('addUpdateFormDialog.add')}
        </Link>
      )}
    </div>
  );
};
