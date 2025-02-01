import { IUpdateFormData } from '@interfaces/models';
import { Trans, useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSubjects } from '@/hooks/useSubjects';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { ArrowLeft } from 'lucide-react';

export const UpdateForm = () => {
  const form = useForm<IUpdateFormData>();
  // const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const { subjects } = useSubjects();

  const {
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: IUpdateFormData) => {
      if (authUser?.id) {
        data.teacherId = authUser.id;
      }
      return window.api.insertUpdate(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      form.reset();
    },
  });

  const onUpdateSubmit = (data: IUpdateFormData) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t('addUpdateForm.title')}</CardTitle>
        <CardDescription>{t('addUpdateForm.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-right">
          <Button asChild variant={'link'}>
            <Link to={`/updates`}>
              <ArrowLeft /> {t('addUpdateForm.backToUpdatesPage')}
            </Link>
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 gap-6">
            <FormField
              name="grade"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="grade">{t('addUpdateForm.grade')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('addUpdateForm.gradePlaceholder')} />
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
                  <FormErrorMessage>{t('addUpdateForm.errors.grade.required')}</FormErrorMessage>
                </FormItem>
              )}
            />

            <FormField
              name="subjectId"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="subjectId">{t('addUpdateForm.subject')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('addUpdateForm.subjectPlaceholder')} />
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
                  <FormErrorMessage>{t('addUpdateForm.errors.subject.required')}</FormErrorMessage>
                </FormItem>
              )}
            />

            <FormField
              name="teachingMethod"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="teachingMethod">
                    {t('addUpdateForm.teachingMethod')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('addUpdateForm.teachingMethodPlaceholder')}
                    />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.teachingMethod.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="teachingAid"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="teachingAid">{t('addUpdateForm.teachingAid')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t('addUpdateForm.teachingAidPlaceholder')} />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.teachingAid.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="boardWork"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="boardWork">{t('addUpdateForm.boardWork')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t('addUpdateForm.boardWorkPlaceholder')} />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.boardWork.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="objectives"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="objectives">{t('addUpdateForm.objectives')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t('addUpdateForm.objectivesPlaceholder')} />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.objectives.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="teacherProcedure"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="teacherProcedure">
                    {t('addUpdateForm.teacherProcedure')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('addUpdateForm.teacherProcedurePlaceholder')}
                    />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.teacherProcedure.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="studentProcedure"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="studentProcedure">
                    {t('addUpdateForm.studentProcedure')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('addUpdateForm.studentProcedurePlaceholder')}
                    />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.studentProcedure.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="onlineMedium"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="onlineMedium">{t('addUpdateForm.onlineMedium')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t('addUpdateForm.onlineMediumPlaceholder')} />
                  </FormControl>
                  <FormErrorMessage>
                    {t('addUpdateForm.errors.onlineMedium.required')}
                  </FormErrorMessage>
                </FormItem>
              )}
            />
            <FormField
              name="homeWork"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="homeWork">{t('addUpdateForm.homeWork')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t('addUpdateForm.homeWorkPlaceholder')} />
                  </FormControl>
                  <FormErrorMessage>{t('addUpdateForm.errors.homeWork.required')}</FormErrorMessage>
                </FormItem>
              )}
            />
            {isError && <p className="text-destructive mb-4">{t('addUpdateForm.root.error')}</p>}
            {isSuccess && (
              <p className="text-success mb-4">
                <Trans i18nKey={'addUpdateForm.root.success'}>
                  Update inserted successfully,{' '}
                  <Link className="text-primary" to="/updates">
                    go to dashboard
                  </Link>
                </Trans>
              </p>
            )}
            <Button disabled={isPending} size={'lg'} type="submit">
              {t('addUpdateForm.save')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
