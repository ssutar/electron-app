import { IUpdate } from '@interfaces/models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type UpdatesTableProps = {
  onSelect?: (id: string) => {};
  updates: IUpdate[];
};

export const UpdatesTable = ({ updates, onSelect }: UpdatesTableProps) => {
  const [selectedId, setSelectedId] = useState(null);
  const { t } = useTranslation();

  const handleSelect = (updateId) => {
    setSelectedId(updateId);
    onSelect?.(updateId);
  };

  return (
    <table className="daily-register-table">
      <thead>
        <tr>
          <th>{t('updatesTable.columns.grade')}</th>
          <th>{t('updatesTable.columns.subject')}</th>
          <th>{t('updatesTable.columns.teachingMethod')}</th>
          <th>{t('updatesTable.columns.teachingAid')}</th>
          <th>{t('updatesTable.columns.boardWork')}</th>
          <th>{t('updatesTable.columns.objectives')}</th>
          <th>{t('updatesTable.columns.teacherProcedure')}</th>
          <th>{t('updatesTable.columns.studentProcedure')}</th>
          <th>{t('updatesTable.columns.onlineMedium')}</th>
          <th>{t('updatesTable.columns.homeWork')}</th>
        </tr>
      </thead>
      <tbody>
        {updates.map((up: IUpdate) => {
          return (
            <tr
              key={up.id}
              className={selectedId === up.id ? 'selected' : ''}
              onClick={() => handleSelect(up.id)}
            >
              <td>{up.grade}</td>
              <td>{up.subject}</td>
              <td className="block-column">{up.teachingMethod}</td>
              <td className="block-column">{up.teachingAid}</td>
              <td className="block-column">{up.boardWork}</td>
              <td className="block-column">{up.objectives}</td>
              <td className="block-column">{up.teacherProcedure}</td>
              <td className="block-column">{up.studentProcedure}</td>
              <td className="block-column">{up.onlineMedium}</td>
              <td className="block-column">{up.homeWork}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
