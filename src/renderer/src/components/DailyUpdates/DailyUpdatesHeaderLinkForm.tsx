import React from 'react';
import { GoodThoughtsTable } from '../GoodThoughts';
import { Button } from '../UI/Button';
import { Trans, useTranslation } from 'react-i18next';
import { DaySpecialsTable } from '../DaySpecials';
import { useAuth } from '../AuthContext';
import { useMutation } from '@tanstack/react-query';
import { IDailyUpdateHeaderFormData } from '@interfaces/models';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IDailyUpdateHeaderFormData>({
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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1">
        <h4 className="text-lg mb-4">{t('dailyUpdatesHeaderLinkForm.goodThoughts')}</h4>
        <GoodThoughtsTable hideAddLink={true} onSelect={(id) => setValue('goodThoughtId', id)} />
        <input
          {...register('goodThoughtId', {
            required: true,
            validate: (value) => {
              console.log({ value });
              return !!value;
            },
          })}
          type="hidden"
        />
        {errors.goodThoughtId && (
          <p className="text-danger text-sm">
            {t('dailyUpdatesHeaderLinkForm.errors.goodThought.required')}
          </p>
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-lg mb-4">{t('dailyUpdatesHeaderLinkForm.daySpecial')}</h4>
        <DaySpecialsTable hideAddLink={true} onSelect={(id) => setValue('daySpecialId', id)} />
        <input {...register('daySpecialId', { required: true })} type="hidden" />
        {errors.daySpecialId && (
          <p className="text-danger text-sm">
            {t('dailyUpdatesHeaderLinkForm.errors.daySpecial.required')}
          </p>
        )}
      </div>
      {isError && <p className="text-danger mb-4">{t('linkDailyUpdateForm.root.error')}</p>}
      {isSuccess && (
        <p className="text-success mb-4">
          <Trans i18nKey={'linkDailyUpdateForm.root.success'}>
            Good thought and day special linked successfully,{' '}
            <Link className="text-primary" to="/dashboard/daily-updates">
              go to daily updates
            </Link>
          </Trans>
        </p>
      )}
      <Button
        isFullWidth={true}
        size={'lg'}
        type="submit"
        label={t('dailyUpdatesHeaderLinkForm.save')}
      ></Button>
    </form>
  );
};
