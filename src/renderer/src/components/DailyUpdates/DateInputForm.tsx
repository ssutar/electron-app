import { useTranslation } from 'react-i18next';
import { Input } from '../UI/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';

export type DateInputFormProps = {
  currentDate: Date;
  onDateChange: (dateValue: Date) => void;
};

export const DateInputForm = ({ currentDate, onDateChange }: DateInputFormProps) => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm();

  const currentDateString = [
    currentDate.getFullYear(),
    ('0' + (currentDate.getMonth() + 1)).slice(-2),
    ('0' + currentDate.getDate()).slice(-2)
  ].join('-');

  const onDateSubmit = (data) => {
    onDateChange(new Date(data.registerDate));
  };

  return (
    <Card title={'Select the date and serach for daily updates'}>
      <form onSubmit={handleSubmit(onDateSubmit)}>
        <div className="flex gap-2 justify-between flex-col md:flex-row md:gap-6">
          <div className="flex flex-1 items-center gap-6">
            <Input
              control={control}
              label={t('dateForm.date')}
              htmlType="date"
              name="registerDate"
              defaultValue={currentDateString}
            />
          </div>
          <div>
            <Button size="lg" htmlType="submit" label="Search" isFullWidth={true} />
          </div>
        </div>
      </form>
    </Card>
  );
};
