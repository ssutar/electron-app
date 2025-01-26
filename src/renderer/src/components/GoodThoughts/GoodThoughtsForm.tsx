import { IGoodThought } from '@interfaces/models';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

export const GoodThoughtsForm = () => {
  const { control, handleSubmit, reset: resetForm } = useForm<IGoodThought>();
  const { t } = useTranslation();
  const { authUser } = useAuth();

  const {
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: IGoodThought) => {
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      return window.api.insertGoodThought(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      resetForm();
    },
  });

  const onUpdateSubmit = (data: IGoodThought) => {
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
          name="thought"
          errorMessage={t('addGoodThoughtForm.errors.thought.required')}
          label={t('addGoodThoughtForm.thought')}
          placeholder={t('addGoodThoughtForm.thought')}
          rows={3}
        />
      </div>

      {isError && <p className="text-danger mb-4">{t('addGoodThoughtForm.root.error')}</p>}
      {isSuccess && (
        <p className="text-success mb-4">
          <Trans i18nKey={'addGoodThoughtForm.root.success'}>
            Good thought inserted successfully,{' '}
            <Link className="text-primary" to="/dashboard/good-thoughts">
              go back to good thoughts
            </Link>
          </Trans>
        </p>
      )}
      <Button
        disabled={isPending}
        isFullWidth={true}
        size={'lg'}
        type="submit"
        label={t('addGoodThoughtForm.save')}
      ></Button>
    </form>
  );
};
