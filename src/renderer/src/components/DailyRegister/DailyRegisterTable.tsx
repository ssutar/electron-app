import React from 'react';
import { useTranslation } from 'react-i18next';
import { IUpdate } from '@interfaces/models';

export type DailyRegisterTableType = {
  dailyUpdates: IUpdate[];
};

export const DailyRegisterTable = ({ dailyUpdates }) => {
  const { t } = useTranslation();

  return (
    <table className="daily-register-table">
      <thead>
        <tr>
          <th>{t('dailyRegisterTable.columns.period')}</th>
          <th>{t('dailyRegisterTable.columns.grade')}</th>
          <th>{t('dailyRegisterTable.columns.subject')}</th>
          <th>{t('dailyRegisterTable.columns.teachingMethod')}</th>
          <th>{t('dailyRegisterTable.columns.teachingAid')}</th>
          <th>{t('dailyRegisterTable.columns.boardWork')}</th>
          <th>{t('dailyRegisterTable.columns.objectives')}</th>
          <th>{t('dailyRegisterTable.columns.teacherProcedure')}</th>
          <th>{t('dailyRegisterTable.columns.studentProcedure')}</th>
          <th>{t('dailyRegisterTable.columns.onlineMedium')}</th>
          <th>{t('dailyRegisterTable.columns.homeWork')}</th>
        </tr>
      </thead>
      <tbody>
        {dailyUpdates.map((up: IUpdate) => {
          return (
            <tr key={up.id}>
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
