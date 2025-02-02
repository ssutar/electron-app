import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { formatDateYYYYMMDD } from '@/utils/date';
import { useMemo } from 'react';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

export type DateInputFormProps = {
  currentDate: Date;
  isDisabled: boolean;
  onDateChange: (dateValue: Date) => void;
};

export interface IDateInputFormData {
  date: string;
}

export const DateInputForm = ({ currentDate, onDateChange, isDisabled }: DateInputFormProps) => {
  const { t } = useTranslation();
  const form = useForm<IDateInputFormData>();
  const currentDateString = useMemo(() => formatDateYYYYMMDD(currentDate), [currentDate]);

  const onDateSubmit = (data: IDateInputFormData) => {
    onDateChange(new Date(data.date));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onDateSubmit)}>
        <div className="flex gap-6 justify-between flex-col md:flex-row">
          <div className="flex flex-1 items-center gap-4">
            <FormField
              name="date"
              control={form.control}
              rules={{ required: true }}
              defaultValue={currentDateString}
              render={({ field }) => (
                <FormItem className="flex flex-1 items-center gap-4">
                  <FormLabel htmlFor="email">{t('dateInputForm.date')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="!mt-0"
                      type="date"
                      placeholder={t('dateInputForm.datePlaceholder')}
                      formNoValidate
                    />
                  </FormControl>
                  <FormErrorMessage>{t('dateInputForm.errors.date.required')}</FormErrorMessage>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={isDisabled}>{t('dateInputForm.search')}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
