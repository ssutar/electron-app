import { ISubject } from '@interfaces/models';
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
import { Input } from '@/components/ui/input';

export const SubjectsForm = () => {
  const form = useForm<ISubject>();
  const { t } = useTranslation();
  const { authUser } = useAuth();

  const {
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: ISubject) => {
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      return window.api.insertSubject(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      form.reset();
    },
  });

  const onUpdateSubmit = (data: ISubject) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 gap-6">
        <FormField
          name="title"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">{t('addSubjectForm.title')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('addSubjectForm.titlePlaceholder')} />
              </FormControl>
              <FormErrorMessage>{t('addSubjectForm.errors.title.required')}</FormErrorMessage>
            </FormItem>
          )}
        />
        {isError && <p className="text-destructive">{t('addSubjectForm.root.error')}</p>}
        {isSuccess && (
          <p className="text-success mb-4">
            <Trans i18nKey={'addSubjectForm.root.success'}>
              Subject inserted successfully,{' '}
              <Link className="text-primary" to="/subjects">
                go back to subjects
              </Link>
            </Trans>
          </p>
        )}
        <Button disabled={isPending} size={'lg'} type="submit">
          {t('addSubjectForm.save')}
        </Button>
      </form>
    </Form>
  );
};
