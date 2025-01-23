import { ILinkDailyUpdateFormData, IUpdate } from '@interfaces/models';
import { useTranslation } from 'react-i18next';
import { Select } from '../UI/Select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../UI/Button';
import { UpdatesTable } from '../Updates/UpdatesTable';
import { Card } from '../UI/Card';
import { useSubjects } from '@renderer/hooks/useSubjects';

export type DailyUpdateFormProps = {
  date?: string;
};

export const DailyUpdateForm = ({ date }: DailyUpdateFormProps) => {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<ILinkDailyUpdateFormData>();
  const [updates, setUpdates] = useState<IUpdate[]>([]);

  const { subjects } = useSubjects();

  const onSearch = (data: ILinkDailyUpdateFormData) => {
    window.api.searchUpdates(data).then(setUpdates);
  };

  const onSelect = (updateId: string) => {
    console.log(updateId);
  };

  return (
    <>
      <Card title={'Please select the grade and subject to search'}>
        <form onSubmit={handleSubmit(onSearch)}>
          {/* <div className="mb-4">
            <Select
              // @ts-expect-error
              control={control}
              rules={{
                required: true,
                validate: (value) => value > 0
              }}
              name="period"
              defaultValue=""
              errorMessage={t('addUpdateForm.errors.period.required')}
              label={t('addUpdateForm.period')}
              options={periods.map((g) => ({
                value: g,
                label: g
              }))}
              placeholder={t('addUpdateForm.selectPeriod')}
            />
          </div> */}
          <div className="mb-4">
            <Select
              // @ts-expect-error
              control={control}
              rules={{
                required: true,
                validate: (value) => value > 0
              }}
              name="grade"
              defaultValue=""
              errorMessage={t('addUpdateForm.errors.grade.required')}
              label={t('addUpdateForm.selectGrade')}
              options={grades.map((g) => ({
                value: g,
                label: g
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
                validate: (value) => value > 0
              }}
              name="subjectId"
              defaultValue=""
              errorMessage={t('addUpdateForm.errors.subject.required')}
              label={t('addUpdateForm.subject')}
              options={subjects.map((sub, index) => ({
                value: sub.id || index,
                label: sub.title
              }))}
              placeholder="Select your subject"
            />
          </div>
          <Button className="mt-4" label={'Search'} isFullWidth={true} size={'lg'} />
        </form>
      </Card>
      <Card title={'Please selet the update from the table and period'}>
        <form>
          <div className="mb-4">
            <UpdatesTable
              updates={updates}
              onSelect={onSelect}
              hideAddUpdatesLink={true}
              emptyState={<>Could not find any updates, please add updates</>}
            />
          </div>
          <div className="mb-4">
            <Select
              // @ts-expect-error
              control={control}
              rules={{
                required: true,
                validate: (value) => value > 0
              }}
              name="period"
              defaultValue=""
              errorMessage={t('addUpdateForm.errors.period.required')}
              label={t('addUpdateForm.period')}
              options={periods.map((g) => ({
                value: g,
                label: g
              }))}
              placeholder={t('addUpdateForm.selectPeriod')}
            />
          </div>
          <Button className="mt-4" label={'Link updates'} isFullWidth={true} size={'lg'} />
        </form>
      </Card>
    </>
  );
};
