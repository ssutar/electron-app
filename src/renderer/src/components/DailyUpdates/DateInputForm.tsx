import { useTranslation } from 'react-i18next';
import { Input } from '../UI/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { formatDateYYYYMMDD } from '@renderer/utils/date';
import { useMemo } from 'react';

export type DateInputFormProps = {
  currentDate: Date;
  isDisabled: boolean;
  onDateChange: (dateValue: Date) => void;
};

export interface IDateInputFormData {
  registerDate: string;
}

export const DateInputForm = ({ currentDate, onDateChange, isDisabled }: DateInputFormProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IDateInputFormData>();
  const currentDateString = useMemo(() => formatDateYYYYMMDD(currentDate), [currentDate]);

  const onDateSubmit = (data: IDateInputFormData) => {
    onDateChange(new Date(data.registerDate));
  };

  return (
    <Card title={t('dateInputForm.title')}>
      <form onSubmit={handleSubmit(onDateSubmit)}>
        <div className="flex gap-6 justify-between flex-col md:flex-row">
          <div className="flex flex-1 items-center gap-6">
            <Input
              // @ts-expect-error
              control={control}
              label={t('dateInputForm.date')}
              htmlType="date"
              name="registerDate"
              defaultValue={currentDateString}
              rules={{
                required: true,
              }}
              errorMessage={t('dateInputForm.errors.date.required')}
            />
          </div>
          <div>
            <Button
              disabled={isDisabled}
              size="lg"
              htmlType="submit"
              label={t('dateInputForm.search')}
              isFullWidth={true}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};
