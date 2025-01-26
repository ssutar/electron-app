import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { DaySpecialsForm } from '@renderer/components/DaySpecials';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AddDaySpecialsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title={t('addDaySpecialsPage.title')} />
      <Card>
        <DaySpecialsForm />
      </Card>
    </>
  );
};
