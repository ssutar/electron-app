import { IDaySpecial } from '@interfaces/models';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

export const DaySpecialsForm = () => {
  const { control, handleSubmit, reset: resetForm } = useForm<IDaySpecial>();
  const { t } = useTranslation();
  const { authUser } = useAuth();

  const {
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: IDaySpecial) => {
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      return window.api.insertDaySpecial(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      resetForm();
    },
  });

  const onUpdateSubmit = (data: IDaySpecial) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onUpdateSubmit)}>
      <div className="mb-4">
        <Input
          // @ts-expect-error
          control={control}
          rules={{
            required: true,
          }}
          defaultValue=""
          name="special"
          errorMessage={t('addDaySpecialForm.errors.special.required')}
          label={t('addDaySpecialForm.special')}
          placeholder={t('addDaySpecialForm.special')}
          rows={3}
        />
      </div>

      {isError && <p className="text-danger mb-4">{t('addDaySpecialForm.root.error')}</p>}
      {isSuccess && (
        <p className="text-success mb-4">
          <Trans i18nKey={'addDaySpecialForm.root.success'}>
            Day special inserted successfully,{' '}
            <Link className="text-primary" to="/dashboard/day-specials">
              go back to day specials
            </Link>
          </Trans>
        </p>
      )}
      <Button
        disabled={isPending}
        isFullWidth={true}
        size={'lg'}
        type="submit"
        label={t('addDaySpecialForm.save')}
      ></Button>
    </form>
  );
};
