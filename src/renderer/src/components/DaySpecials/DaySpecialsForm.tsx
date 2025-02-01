import { IDaySpecial } from '@interfaces/models';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormErrorMessage, FormField, FormItem, FormLabel } from '../ui/form';
import { Textarea } from '../ui/textarea';

export const DaySpecialsForm = () => {
  const form = useForm<IDaySpecial>();
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
      form.reset();
    },
  });

  const onUpdateSubmit = (data: IDaySpecial) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 gap-6">
        <FormField
          name="special"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="special">{t('addDaySpecialForm.special')}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t('addDaySpecialForm.specialPlaceholder')} />
              </FormControl>
              <FormErrorMessage>{t('addDaySpecialForm.errors.special.required')}</FormErrorMessage>
            </FormItem>
          )}
        />
        {isError && <p className="text-danger mb-4">{t('addDaySpecialForm.root.error')}</p>}
        {isSuccess && (
          <p className="text-success mb-4">
            <Trans i18nKey={'addDaySpecialForm.root.success'}>
              Day special inserted successfully,{' '}
              <Link className="text-primary" to="/day-specials">
                go back to day specials
              </Link>
            </Trans>
          </p>
        )}
        <Button disabled={isPending} size={'lg'} type="submit">
          {t('addDaySpecialForm.save')}
        </Button>
      </form>
    </Form>
  );
};
