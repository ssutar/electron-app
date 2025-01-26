import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { DailyUpdatesHeaderLinkForm } from '@renderer/components/DailyUpdates/DailyUpdatesHeaderLinkForm';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const LinkDailyUpdatesHeaderPage = () => {
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date') || '';
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title={t('linkDailyUpdatesHeaderPage.title', { date: currentDate })} />
      <Card>
        <DailyUpdatesHeaderLinkForm date={currentDate} />
      </Card>
    </>
  );
};
