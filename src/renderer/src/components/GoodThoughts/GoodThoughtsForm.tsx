import { IGoodThought } from '@interfaces/models';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const GoodThoughtsForm = () => {
  const form = useForm<IGoodThought>();
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
      form.reset();
    },
  });

  const onUpdateSubmit = (data: IGoodThought) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 gap-6">
        <FormField
          name="thought"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="thought">{t('addGoodThoughtForm.thought')}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t('addGoodThoughtForm.thoughtPlaceholder')} />
              </FormControl>
              <FormErrorMessage>{t('addGoodThoughtForm.errors.thought.required')}</FormErrorMessage>
            </FormItem>
          )}
        />

        {isError && <p className="text-destructive">{t('addGoodThoughtForm.root.error')}</p>}
        {isSuccess && (
          <p className="text-success mb-4">
            <Trans i18nKey={'addGoodThoughtForm.root.success'}>
              Good thought inserted successfully,{' '}
              <Link className="text-primary" to="/good-thoughts">
                go back to good thoughts
              </Link>
            </Trans>
          </p>
        )}
        <Button disabled={isPending} size={'lg'} type="submit">
          {t('addGoodThoughtForm.save')}
        </Button>
      </form>
    </Form>
  );
};
