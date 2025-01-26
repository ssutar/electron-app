import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { DaySpecialsTable } from '@renderer/components/DaySpecials';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DaySpecialsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb title={t('daySpecialsPage.title')} />
      <Card>
        <DaySpecialsTable />
      </Card>
    </>
  );
};
