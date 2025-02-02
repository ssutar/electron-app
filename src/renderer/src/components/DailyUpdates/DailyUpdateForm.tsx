import { ILinkDailyUpdateSearchFormData } from '@interfaces/models';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubjects } from '@/hooks/useSubjects';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/AuthContext';
import { DailyUpdateLinkForm } from './DailyUpdateLinkForm';
import { BlockLoader } from '@/components/ui/Loaders';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export type DailyUpdateFormProps = {
  date: string;
};

export const DailyUpdateForm = ({ date }: DailyUpdateFormProps) => {
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const [searchFormData, setSearchFormData] = useState<ILinkDailyUpdateSearchFormData>();
  const form = useForm<ILinkDailyUpdateSearchFormData>();
  const { authUser } = useAuth();

  const {
    data: updates,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['updates', JSON.stringify(searchFormData)],
    queryFn: () => {
      return searchFormData ? window.api.searchUpdates(searchFormData) : [];
    },
    enabled: !!searchFormData,
  });

  const { subjects } = useSubjects();

  const onSearch = (data: ILinkDailyUpdateSearchFormData) => {
    if (authUser?.id) {
      data.teacherId = authUser.id;
      setSearchFormData(data);
    }
  };

  return (
    <>
      <Card title={t('dailyUpdateSearchForm.title')}>
        <CardHeader>
          <CardTitle className="text-2xl">{t('dailyUpdateSearchForm.title')}</CardTitle>
          <CardDescription>{t('dailyUpdateSearchForm.description', { date })}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-right">
            <Button asChild variant={'link'}>
              <Link to={`/daily-updates`}>
                <ArrowLeft /> {t('dailyUpdateSearchForm.backToDailyUpdatesPage')}
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSearch)} className="grid grid-cols-1 gap-6 mb-4">
                <FormField
                  name="grade"
                  control={form.control}
                  rules={{ required: true, validate: (value) => parseInt(value, 10) > 0 }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="schoolId">{t('dailyUpdateSearchForm.grade')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t('dailyUpdateSearchForm.gradePlaceholder')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem value={`${grade}`} key={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormErrorMessage>
                        {t('dailyUpdateSearchForm.errors.grade.required')}
                      </FormErrorMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="subjectId"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="subjectId">
                        {t('dailyUpdateSearchForm.subject')}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t('dailyUpdateSearchForm.subjectPlaceholder')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem value={`${subject.id}`} key={subject.id}>
                              {subject.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormErrorMessage>
                        {t('dailyUpdateSearchForm.errors.subject.required')}
                      </FormErrorMessage>
                    </FormItem>
                  )}
                />
                <Button className="mt-4" size={'lg'}>
                  {t('dailyUpdateSearchForm.search')}
                </Button>
              </form>
            </Form>
            <>
              {isError && <p className="text-destructive">{t('linkDailyUpdateForm.error')}</p>}
              {isLoading && <BlockLoader />}
              {isSuccess && (
                <>
                  <hr />
                  <DailyUpdateLinkForm updates={updates} date={date} />
                </>
              )}
            </>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
