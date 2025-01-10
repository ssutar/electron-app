import React from 'react';
import { useTranslation } from 'react-i18next';

export type DateInputFormProps = {
  currentDate: Date;
  onDateChange: (dateValue: Date) => void;
};

export const DateInputForm = ({ currentDate, onDateChange }: DateInputFormProps) => {
  const { t } = useTranslation();

  const currentDateString = [
    currentDate.getFullYear(),
    ('0' + (currentDate.getMonth() + 1)).slice(-2),
    ('0' + currentDate.getDate()).slice(-2)
  ].join('-');

  return (
    <form className="flex">
      <div className="hstack flex-1">
        <span>
          <strong>{t('dateForm.date')}</strong>
        </span>
        <input
          type="date"
          name="registerDate"
          style={{ margin: 0, width: 'auto' }}
          className="screen-only"
          value={currentDateString}
          onChange={(e) => onDateChange(new Date((e.target as HTMLInputElement).valueAsNumber))}
        />
        <span className="print-only">{currentDateString}</span>
      </div>
      <div className="hstack flex-1">
        <span>
          <strong>{t('dateForm.day')}</strong>
        </span>
        <span>{currentDate.toLocaleString('default', { weekday: 'long' })}</span>
      </div>
      <div className="hstack flex-1">
        <span>
          <strong>{t('dateForm.month')}</strong>
        </span>
        <span>{currentDate.toLocaleString('default', { month: 'long' })}</span>
      </div>
    </form>
  );
};
