import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IDailyUpdate } from '@interfaces/models';
import { Button } from '../UI/Button';
import { Link } from 'react-router-dom';
import { formatDate } from '@renderer/utils/date';

export type DailyUpdatesTableType = {
  dailyUpdates: IDailyUpdate[];
  currentDate: Date;
  handleRegisterPrint: () => void;
  goodThought?: string;
  daySpecial?: string;
};

export const DailyUpdatesTable = ({
  currentDate,
  dailyUpdates,
  handleRegisterPrint,
  goodThought,
  daySpecial,
}: DailyUpdatesTableType) => {
  const { t } = useTranslation();

  const dateString = useMemo(() => formatDate(currentDate), [currentDate]);

  // bg-slate-200/50 rounded p-6 pb-8 dark:bg-meta-4

  return (
    <>
      <div className="flex justify-between gap-2">
        <div>
          <span className="mr-4 text-black dark:text-white font-medium">
            {t('dailyUpdatesHeader.day')}
          </span>
          <span>{currentDate.toLocaleString('default', { weekday: 'long' })}</span>
        </div>
        <div>
          <span className="mr-4 text-black dark:text-white font-medium">
            {t('dailyUpdatesHeader.date')}
          </span>
          <span>{dateString}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>
          <span className="mr-4 text-black dark:text-white font-medium">
            {t('dailyUpdatesHeader.goodThought')}
          </span>
          {goodThought || t('dailyUpdatesHeader.noGoodThought')}
        </p>
        <p>
          <span className="mr-4 text-black dark:text-white font-medium">
            {t('dailyUpdatesHeader.daySpecial')}
          </span>
          {daySpecial || t('dailyUpdatesHeader.noDaySpecial')}
        </p>
        <Link
          className="block text-primary text-lg text-right"
          to={`/dashboard/link-daily-updates-header?date=${dateString}`}
        >
          {t('dailyUpdatesHeader.change', { date: dateString })}
        </Link>
        <hr />
      </div>
      <Link
        className="block px-4 text-primary text-lg text-right"
        to={`/dashboard/link-daily-updates?date=${dateString}`}
      >
        {t('dailyUpdatesTable.add', { date: dateString })}
      </Link>
      <div className="mb-6 border border-stroke dark:border-strokedark rounded overflow-x-auto">
        <table className="table-auto mb-6">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-b-stroke dark:border-strokedark">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.period')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.grade')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.subject')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.teachingMethod')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.teachingAid')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.boardWork')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.objectives')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.teacherProcedure')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.studentProcedure')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.onlineMedium')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyUpdatesTable.columns.homeWork')}
              </th>
            </tr>
          </thead>
          <tbody>
            {dailyUpdates.length ? (
              dailyUpdates.map((up: IDailyUpdate) => {
                return (
                  <tr key={up.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{up.period}</p>
                    </td>
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
                <td colSpan={11}>
                  <p className="text-black dark:text-white px-6 py-8 text-center">
                    {t('dailyUpdatesTable.empty', { date: dateString })}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button
        disabled={!dailyUpdates.length}
        isFullWidth={true}
        outline={true}
        onClick={handleRegisterPrint}
        label={t('dailyUpdatesTable.print')}
      />
    </>
  );
};
