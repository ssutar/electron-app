import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const StatusPage = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="container container-fixed">
      <header>{state.message}</header>
      <button onClick={() => navigate('/')}>{t('statusPage.goToHomePage')}</button>
    </section>
  );
};
