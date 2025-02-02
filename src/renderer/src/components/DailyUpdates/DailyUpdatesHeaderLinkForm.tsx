import { GoodThoughtsTable } from '@/components/GoodThoughts';
import { Button } from '@/components/ui/button';
import { Trans, useTranslation } from 'react-i18next';
import { DaySpecialsTable } from '@/components/DaySpecials';
import { useAuth } from '@/components/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { IDailyUpdateHeaderFormData } from '@interfaces/models';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FormErrorMessage, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export type DailyUpdatesHeaderLinkFormProps = {
  date: string;
};

export const DailyUpdatesHeaderLinkForm = ({ date }: DailyUpdatesHeaderLinkFormProps) => {
  const { authUser } = useAuth();
  const { t } = useTranslation();

  const { mutateAsync, isSuccess, isError } = useMutation({
    mutationFn: (formData: IDailyUpdateHeaderFormData) => {
      return window.api.linkDailyUpdateHeader(formData);
    },
  });

  const form = useForm<IDailyUpdateHeaderFormData>({
    mode: 'onChange',
    defaultValues: {
      goodThoughtId: '',
      daySpecialId: '',
    },
  });

  const onSubmit = (formData: IDailyUpdateHeaderFormData) => {
    formData.teacherId = authUser?.id || '';
    formData.date = date;
    mutateAsync(formData);
  };

  return (
    <Form {...form}>
      <div className="text-right">
        <Button asChild variant={'link'}>
          <Link to={`/daily-updates`}>
            <ArrowLeft /> {t('dailyUpdateSearchForm.backToDailyUpdatesPage')}
          </Link>
        </Button>
      </div>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="goodThoughtId"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('dailyUpdatesHeaderLinkForm.goodThoughts')}</FormLabel>
              <GoodThoughtsTable
                hideAddLink={true}
                onSelect={(id) => form.setValue('goodThoughtId', id)}
              />
              <Input type="hidden" {...field} />
              <FormErrorMessage>
                {t('dailyUpdatesHeaderLinkForm.errors.goodThought.required')}
              </FormErrorMessage>
            </FormItem>
          )}
        />
        <FormField
          name="daySpecialId"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('dailyUpdatesHeaderLinkForm.daySpecial')}</FormLabel>
              <DaySpecialsTable
                hideAddLink={true}
                onSelect={(id) => form.setValue('daySpecialId', id)}
              />
              <Input type="hidden" {...field} />
              <FormErrorMessage>
                {t('dailyUpdatesHeaderLinkForm.errors.daySpecial.required')}
              </FormErrorMessage>
            </FormItem>
          )}
        />

        {/* <input
            {...register('goodThoughtId', {
              required: true,
              validate: (value) => {
                console.log({ value });
                return !!value;
              },
            })}
            type="hidden"
          /> */}
        {/* {errors.goodThoughtId && (
            <p className="text-destructive text-sm">
              {t('dailyUpdatesHeaderLinkForm.errors.goodThought.required')}
            </p>
          )} */}

        {/* <h4 className="text-lg mb-4">{t('dailyUpdatesHeaderLinkForm.daySpecial')}</h4>
        <DaySpecialsTable hideAddLink={true} onSelect={(id) => setValue('daySpecialId', id)} />
        <input {...register('daySpecialId', { required: true })} type="hidden" />
        {errors.daySpecialId && (
          <p className="text-destructive text-sm">
            {t('dailyUpdatesHeaderLinkForm.errors.daySpecial.required')}
          </p>
        )} */}
        {isError && <p className="text-destructive">{t('linkDailyUpdateForm.root.error')}</p>}
        {isSuccess && (
          <p className="text-success mb-4">
            <Trans i18nKey={'linkDailyUpdateForm.root.success'}>
              Good thought and day special linked successfully,{' '}
              <Link className="text-primary" to="/daily-updates">
                go to daily updates
              </Link>
            </Trans>
          </p>
        )}
        <Button size={'lg'} type="submit">
          {t('dailyUpdatesHeaderLinkForm.save')}
        </Button>
      </form>
    </Form>
  );
};
