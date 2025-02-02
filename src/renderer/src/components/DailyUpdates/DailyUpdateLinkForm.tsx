import { ILinkDailyUpdateFormData, IUpdate } from '@interfaces/models';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UpdatesTable } from '@/components/Updates/UpdatesTable';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/components/AuthContext';
import { Link } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { H3 } from '@/components/ui/typography';

type DailyUpdateLinkFormProps = {
  date: string;
  updates: IUpdate[];
};

export const DailyUpdateLinkForm = ({ updates, date }: DailyUpdateLinkFormProps) => {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { t } = useTranslation();
  const form = useForm<ILinkDailyUpdateFormData>();
  const { authUser } = useAuth();

  const { mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: ILinkDailyUpdateFormData) => {
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      data.date = date;
      return window.api.linkDailyUpdate(data);
    },
  });

  const onLink = (data: ILinkDailyUpdateFormData) => {
    mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLink)} className="grid grid-cols-1 gap-6">
        <H3>{t('linkDailyUpdateForm.updatesSearchResults', { date })} </H3>
        <FormField
          name="updateId"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('linkDailyUpdateForm.updateId')}</FormLabel>
              <UpdatesTable
                updates={updates}
                onSelect={(id) => form.setValue('updateId', id)}
                hideAddUpdatesLink={true}
              />
              <Input type="hidden" {...field} />
              <FormErrorMessage>
                {t('linkDailyUpdateForm.errors.updateId.required')}
              </FormErrorMessage>
            </FormItem>
          )}
        />
        <FormField
          name="period"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="period">{t('linkDailyUpdateForm.period')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('linkDailyUpdateForm.periodPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem value={`${period}`} key={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage>{t('linkDailyUpdateForm.errors.period.required')}</FormErrorMessage>
            </FormItem>
          )}
        />
        {isError && <p className="text-destructive">{t('linkDailyUpdateForm.root.error')}</p>}
        {isSuccess && (
          <p className="text-success">
            <Trans i18nKey={'linkDailyUpdateForm.root.success'}>
              Update linked successfully,{' '}
              <Link className="text-primary" to="/daily-updates">
                go to daily updates
              </Link>
            </Trans>
          </p>
        )}
        <Button disabled={updates.length === 0 || isPending} size={'lg'}>
          {t('linkDailyUpdateForm.linkDailyUpdates', { date })}
        </Button>
      </form>
    </Form>
  );
};
