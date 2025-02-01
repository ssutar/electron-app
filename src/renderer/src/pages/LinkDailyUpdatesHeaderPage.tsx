import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { DailyUpdatesHeaderLinkForm } from '@/components/DailyUpdates/DailyUpdatesHeaderLinkForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/date';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const LinkDailyUpdatesHeaderPage = () => {
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date') || formatDate(new Date());
  const { t } = useTranslation();
  useSetBreadcrumbs([
    { name: t('breadcrumb.dailyUpdates'), path: '/daily-updates' },
    { name: t('breadcrumb.addDailyUpdatesHeader'), path: '/daily-updates/add-header' },
  ]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t('linkDailyUpdatesHeaderPage.title', { date: currentDate })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DailyUpdatesHeaderLinkForm date={currentDate} />
        </CardContent>
      </Card>
    </>
  );
};
