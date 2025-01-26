import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { GoodThoughtsForm } from '@renderer/components/GoodThoughts';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AddGoodThoughtsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title={t('addGoodThoughtsPage.title')} />
      <Card>
        <GoodThoughtsForm />
      </Card>
    </>
  );
};
