import { ILinkDailyUpdateFormData, IUpdate } from '@interfaces/models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';
import { UpdatesTable } from '../Updates/UpdatesTable';
import { useMutation } from '@tanstack/react-query';

export const DailyUpdateLinkForm = ({ updates }: { updates: IUpdate[] }) => {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { t } = useTranslation();
  const [updateId, setUpdateId] = useState<string>();
  const { control, handleSubmit } = useForm<ILinkDailyUpdateFormData>();

  const onSelect = (updateId: string) => {
    console.log({ updateId });
    setUpdateId(updateId);
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: ILinkDailyUpdateFormData) => {
      if (updateId) {
        data.updateId = updateId;
      }
      return window.api.linkUpdate(data);
    },
  });

  const onLink = (data: ILinkDailyUpdateFormData) => {
    mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onLink)}>
      <div className="mb-4">
        <UpdatesTable
          updates={updates}
          onSelect={onSelect}
          hideAddUpdatesLink={true}
          emptyState={<>Could not find any updates, please add updates</>}
        />
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
          errorMessage={t('addUpdateForm.errors.period.required')}
          label={t('addUpdateForm.period')}
          options={periods.map((g) => ({
            value: g,
            label: g,
          }))}
          placeholder={t('addUpdateForm.selectPeriod')}
        />
      </div>
      <Button
        htmlType="submit"
        className="mt-4"
        label={'Link updates'}
        isFullWidth={true}
        size={'lg'}
      />
    </form>
  );
};
