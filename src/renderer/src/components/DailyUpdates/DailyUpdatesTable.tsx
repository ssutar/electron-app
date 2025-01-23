import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IUpdate } from '@interfaces/models';
import { Button } from '../UI/Button';
import { Link } from 'react-router-dom';
import { Card } from '../UI/Card';

export type DailyUpdatesTableType = {
  dailyUpdates: IUpdate[];
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
  daySpecial
}: DailyUpdatesTableType) => {
  const { t } = useTranslation();

  const dateString = useMemo(() => {
    const date = `${currentDate.getDate()}`.padStart(2, '0');
    const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${date}-${month}-${year}`;
  }, [currentDate]);

  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between gap-2">
            <div className="flex-1">
              <span className="mr-4 text-black dark:text-white font-medium">
                {t('dateForm.day')}
              </span>
              <span>{currentDate.toLocaleString('default', { weekday: 'long' })}</span>
            </div>
            <div className="flex-1">
              <span className="mr-4 text-black dark:text-white font-medium">Date</span>
              <span>{dateString}</span>
            </div>
          </div>
          <p>
            <span className="mr-4 text-black dark:text-white font-medium">Good thought</span>Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quisquam harum quas error explicabo
            doloribus? Sint alias laborum maxime quasi consequuntur, neque asperiores illo, vero
            delectus rem tempora quaerat ea inventore.
          </p>
        </div>
        <div className="flex-1">
          <p>
            <span className="mr-4 text-black dark:text-white font-medium">Day special</span>Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Veritatis saepe voluptatem sed, quod
            consequatur sit deserunt, provident voluptatibus accusantium fugiat error molestiae amet
            cupiditate maxime dolorum culpa quis modi dolores.
          </p>
        </div>
      </div>
      <div className="mb-6 border border-stroke dark:border-strokedark rounded overflow-x-auto">
        <table className="table-auto mb-6">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-b-stroke dark:border-strokedark">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.period')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.grade')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.subject')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.teachingMethod')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.teachingAid')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.boardWork')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.objectives')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.teacherProcedure')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.studentProcedure')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.onlineMedium')}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {t('dailyRegisterTable.columns.homeWork')}
              </th>
            </tr>
          </thead>
          <tbody>
            {dailyUpdates.length ? (
              dailyUpdates.map((up: IUpdate) => {
                return (
                  <tr key={up.id}>
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
                  <p className="text-black dark:text-white px-6 py-8 text-center">{`No daily updates found for the date ${dateString}`}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Link
          className="block px-4 py-6 text-primary text-lg"
          to={`/dashboard/link-daily-updates?date=${dateString}`}
        >
          {t('linkDailyUpdateFormDialog.add', { date: dateString })}
        </Link>
      </div>
      <Button
        disabled={!dailyUpdates.length}
        isFullWidth={true}
        outline={true}
        onClick={handleRegisterPrint}
        label={t('homePage.print')}
      />
    </Card>
  );
};
