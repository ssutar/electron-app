import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { UpdateForm } from '@renderer/components/Updates/UpdateForm';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AddUpdatesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb title={t('addUpdatesPage.title')} />
      <UpdateForm />
    </>
  );
};
