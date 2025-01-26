import { ILinkDailyUpdateFormData, IUpdate } from '@interfaces/models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';
import { UpdatesTable } from '../Updates/UpdatesTable';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

type DailyUpdateLinkFormProps = {
  date: string;
  updates: IUpdate[];
};

export const DailyUpdateLinkForm = ({ updates, date }: DailyUpdateLinkFormProps) => {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { t } = useTranslation();
  const [updateId, setUpdateId] = useState<string>();
  const { control, handleSubmit } = useForm<ILinkDailyUpdateFormData>();
  const { authUser } = useAuth();

  const onSelect = (updateId: string) => {
    setUpdateId(updateId);
  };

  const { mutateAsync, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: (data: ILinkDailyUpdateFormData) => {
      if (updateId) {
        data.updateId = updateId;
      }
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      data.date = date;
      return window.api.linkDailyUpdate(data);
    },
    onSuccess: () => {
      setUpdateId('');
      reset();
    },
  });

  const onLink = (data: ILinkDailyUpdateFormData) => {
    mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onLink)}>
      <div className="mb-4">
        <UpdatesTable updates={updates} onSelect={onSelect} hideAddUpdatesLink={true} />
      </div>
      <div className="mb-4">
        <Select
          // @ts-expect-error
          control={control}
          rules={{
            required: true,
            validate: (value) => value > 0,
          }}
          name="period"
          defaultValue=""
          errorMessage={t('linkDailyUpdateForm.errors.period.required')}
          label={t('linkDailyUpdateForm.period')}
          options={periods.map((g) => ({
            value: g,
            label: g,
          }))}
          placeholder={t('linkDailyUpdateForm.selectPeriod')}
        />
      </div>
      {isError && <p className="text-danger mb-4">{t('linkDailyUpdateForm.root.error')}</p>}
      {isSuccess && (
        <p className="text-success mb-4">
          <Trans i18nKey={'linkDailyUpdateForm.root.success'}>
            Update linked successfully,{' '}
            <Link className="text-primary" to="/dashboard/daily-updates">
              go to daily updates
            </Link>
          </Trans>
        </p>
      )}
      <Button
        disabled={updates.length === 0 || isPending}
        htmlType="submit"
        className="mt-4"
        label={t('linkDailyUpdateForm.linkDailyUpdates')}
        isFullWidth={true}
        size={'lg'}
      />
    </form>
  );
};
