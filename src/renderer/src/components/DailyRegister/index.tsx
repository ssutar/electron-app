import React, { useEffect, useState } from 'react';
import { DailyUpdateFormDialog } from './DailyUpdateFormDialog';
import { IUpdate } from '@interfaces/models';

import { useTranslation } from 'react-i18next';
import { DateInputForm } from './DateInputForm';
import { DailyRegisterTable } from './DailyRegisterTable';

export const DailyRegister = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyUpdates, setDailyUpdates] = useState<IUpdate[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    window.api.getUpdatesByDate(currentDate.toISOString().slice(0, 10)).then((updates) => {
      setDailyUpdates(updates);
    });
  }, [currentDate]);

  const handleRegisterPrint = () => {
    window.api.print();
  };
  return (
    <section className="container">
      <header
        className="flex"
        style={{ justifyContent: 'space-between', paddingBottom: 'var(--pico-spacing)' }}
      >
        <h2>{t('homePage.title')}</h2>
        <button className="outline" onClick={handleRegisterPrint} id="register-print-button">
          {t('homePage.print')}
        </button>
      </header>
      <DateInputForm currentDate={currentDate} onDateChange={setCurrentDate} />
      <DailyRegisterTable dailyUpdates={dailyUpdates} />
      <DailyUpdateFormDialog date={currentDate} />
    </section>
  );
};
