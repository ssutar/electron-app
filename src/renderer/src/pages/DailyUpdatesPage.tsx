import { useState } from 'react';

import { DateInputForm } from '../components/DailyUpdates/DateInputForm';
import { DailyUpdatesTable } from '../components/DailyUpdates/DailyUpdatesTable';
import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { formatDate } from '@renderer/utils/date';
import { useAuth } from '@renderer/components/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@renderer/components/UI/Card';
import { BlockLoader } from '@renderer/components/UI/Loaders';
import { useTranslation } from 'react-i18next';
import { IDailyUpdate, IDailyUpdateHeader } from '@interfaces/models';

export const DailyUpdatesPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { authUser } = useAuth();
  const { t } = useTranslation();

  const {
    data: [dailyUpdates, dailyUpdatesHeader],
    isLoading,
    isSuccess,
  } = useQuery<[IDailyUpdate[], IDailyUpdateHeader]>({
    queryKey: ['daily-updates', currentDate],
    queryFn: () => {
      return Promise.all([
        window.api.getDailyUpdatesByDate({
          date: formatDate(currentDate),
          teacherId: authUser?.id || '',
        }),
        window.api.getDailyUpdateHeaderByDate({
          date: formatDate(currentDate),
          teacherId: authUser?.id || '',
        }),
      ]);
    },
    initialData: [[], {} as IDailyUpdateHeader],
  });
  const handleRegisterPrint = () => {
    window.api.print();
  };

  return (
    <>
      <Breadcrumb title={t('dailyUpdatesPage.title')} />
      <DateInputForm
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        isDisabled={isLoading}
      />

      <Card>
        {isLoading && <BlockLoader />}
        {isSuccess && (
          <DailyUpdatesTable
            handleRegisterPrint={handleRegisterPrint}
            currentDate={currentDate}
            dailyUpdates={dailyUpdates}
            daySpecial={dailyUpdatesHeader?.daySpecial}
            goodThought={dailyUpdatesHeader?.goodThought}
          />
        )}
      </Card>
    </>
  );
};
