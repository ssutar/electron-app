import { ILinkDailyUpdateSearchFormData } from '@interfaces/models';
import { useTranslation } from 'react-i18next';
import { Select } from '../UI/Select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { useSubjects } from '@renderer/hooks/useSubjects';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../AuthContext';
import { DailyUpdateLinkForm } from './DailyUpdateLinkForm';
import { BlockLoader } from '@renderer/components/UI/Loaders';

export type DailyUpdateFormProps = {
  date: string;
};

export const DailyUpdateForm = ({ date }: DailyUpdateFormProps) => {
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const [searchFormData, setSearchFormData] = useState<ILinkDailyUpdateSearchFormData>();
  const { control, handleSubmit } = useForm<ILinkDailyUpdateSearchFormData>();
  const { authUser } = useAuth();

  const {
    data: updates,
    isLoading,
    isError,
    isPending,
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
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="mb-4">
            <Select
              // @ts-expect-error
              control={control}
              rules={{
                required: true,
                validate: (value) => value > 0,
              }}
              name="grade"
              defaultValue=""
              errorMessage={t('dailyUpdateSearchForm.errors.grade.required')}
              label={t('dailyUpdateSearchForm.grade')}
              options={grades.map((g) => ({
                value: g,
                label: g,
              }))}
              placeholder={t('dailyUpdateSearchForm.selectGrade')}
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
              name="subjectId"
              defaultValue=""
              errorMessage={t('dailyUpdateSearchForm.errors.subject.required')}
              label={t('dailyUpdateSearchForm.subject')}
              options={subjects.map((sub, index) => ({
                value: sub.id || index,
                label: sub.title,
              }))}
              placeholder={t('dailyUpdateSearchForm.selectSubject')}
            />
          </div>
          <Button
            htmlType="submit"
            className="mt-4"
            label={'Search'}
            isFullWidth={true}
            size={'lg'}
          />
        </form>
      </Card>
      <Card isHidden={isPending} title={isError ? '' : t('linkDailyUpdateForm.title')}>
        {isError && <p className="text-danger mb-4">{t('linkDailyUpdateForm.error')}</p>}
        {isLoading && <BlockLoader />}
        {isSuccess && <DailyUpdateLinkForm updates={updates} date={date} />}
      </Card>
    </>
  );
};
