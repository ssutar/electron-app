import { Button } from '@renderer/components/UI/Button';
import { Card } from '@renderer/components/UI/Card';
import React from 'react';
import { CheckCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const StatusPage = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card>
      <h2 className="mb-4 text-title-md2 text-black dark:text-white text-center">
        {state?.message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.'}
      </h2>
      <span className="my-15 block text-success">
        <CheckCircle size={80} />
      </span>
      <Button onClick={() => navigate('/')} label={t('statusPage.goToHomePage')}>
        {t('statusPage.goToHomePage')}
      </Button>
    </Card>
  );
};
