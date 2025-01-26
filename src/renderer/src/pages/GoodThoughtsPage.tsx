import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { GoodThoughtsTable } from '@renderer/components/GoodThoughts';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const GoodThoughtsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb title={t('goodThoughtsPage.title')} />
      <Card>
        <GoodThoughtsTable />
      </Card>
    </>
  );
};
