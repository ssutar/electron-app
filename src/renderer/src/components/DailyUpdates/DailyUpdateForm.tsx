import { ILinkDailyUpdateSearchFormData, IUpdate } from '@interfaces/models';
import { useTranslation } from 'react-i18next';
import { Select } from '../UI/Select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../UI/Button';
import { UpdatesTable } from '../Updates/UpdatesTable';
import { Card } from '../UI/Card';
import { useSubjects } from '@renderer/hooks/useSubjects';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../UI/Spinner';
import { useAuth } from '../AuthContext';
import { DailyUpdateLinkForm } from './DailyUpdateLinkForm';

export type DailyUpdateFormProps = {
  date?: string;
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
      <Card title={'Please select the grade and subject to search'}>
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
              errorMessage={t('addUpdateForm.errors.grade.required')}
              label={t('addUpdateForm.selectGrade')}
              options={grades.map((g) => ({
                value: g,
                label: g,
              }))}
              placeholder="Select your grade"
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
              errorMessage={t('addUpdateForm.errors.subject.required')}
              label={t('addUpdateForm.subject')}
              options={subjects.map((sub, index) => ({
                value: sub.id || index,
                label: sub.title,
              }))}
              placeholder="Select your subject"
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
      <Card
        isHidden={isPending}
        title={isError ? '' : 'Please selet the update from the table and period'}
      >
        {isError && (
          <p className="text-danger mb-4">{'Something went wrong, please try again later'}</p>
        )}
        {isLoading && (
          <div className="grid place-items-center p-4 gap-4">
            <Spinner />
            <p>{'Loading...'}</p>
          </div>
        )}
        {isSuccess && <DailyUpdateLinkForm updates={updates} />}
      </Card>
    </>
  );
};
