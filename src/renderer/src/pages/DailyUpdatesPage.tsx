import { useState } from 'react';

import { DateInputForm } from '../components/DailyUpdates/DateInputForm';
import { DailyUpdatesTable } from '../components/DailyUpdates/DailyUpdatesTable';
import { formatDate } from '@/utils/date';
import { useAuth } from '@/components/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlockLoader } from '@/components/ui/Loaders';
import { useTranslation } from 'react-i18next';
import { IDailyUpdate, IDailyUpdateHeader } from '@interfaces/models';
import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';

export const DailyUpdatesPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { authUser } = useAuth();
  const { t } = useTranslation();
  useSetBreadcrumbs([{ name: t('breadcrumb.dailyUpdates'), path: '/daily-updates' }]);
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('dateInputForm.title')}</CardTitle>
          <CardDescription>{t('dateInputForm.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <DateInputForm
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            isDisabled={isLoading}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('dailyUpdatesPage.title')}</CardTitle>
          <CardDescription>{t('dailyUpdatesPage.description')}</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
};
