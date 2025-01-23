import { useEffect, useState } from 'react';
import { IUpdate } from '@interfaces/models';

import { DateInputForm } from '../components/DailyUpdates/DateInputForm';
import { DailyUpdatesTable } from '../components/DailyUpdates/DailyUpdatesTable';
import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';

export const DailyUpdatesPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyUpdates, setDailyUpdates] = useState<IUpdate[]>([]);

  useEffect(() => {
    window.api.getUpdatesByDate(currentDate.toISOString().slice(0, 10)).then((updates) => {
      setDailyUpdates(updates);
    });
  }, [currentDate]);

  const handleRegisterPrint = () => {
    window.api.print();
  };

  return (
    <>
      <Breadcrumb title="Daily updates" />
      <DateInputForm currentDate={currentDate} onDateChange={setCurrentDate} />

      <DailyUpdatesTable
        handleRegisterPrint={handleRegisterPrint}
        currentDate={currentDate}
        dailyUpdates={dailyUpdates}
      />
    </>
  );
};
