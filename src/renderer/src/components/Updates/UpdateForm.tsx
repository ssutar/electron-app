import { IUpdateFormData } from '@interfaces/models';
import { Trans, useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { useForm } from 'react-hook-form';
import { Select } from '../UI/Select';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { useSubjects } from '@renderer/hooks/useSubjects';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export type UpdateFormProps = {
  onSuccess: () => void;
};

export const UpdateForm = ({ onSuccess }: UpdateFormProps) => {
  const { control, handleSubmit, reset: resetForm } = useForm<IUpdateFormData>();
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
      resetForm();
    },
  });

  const onUpdateSubmit = (data: IUpdateFormData) => {
    resetMutation();
    return mutateAsync(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onUpdateSubmit)}>
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
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="teachingMethod"
            errorMessage={t('addUpdateForm.errors.teachingMethod.required')}
            label={t('addUpdateForm.teachingMethod')}
            placeholder={t('addUpdateForm.teachingMethod')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="teachingAid"
            errorMessage={t('addUpdateForm.errors.teachingAid.required')}
            label={t('addUpdateForm.teachingAid')}
            placeholder={t('addUpdateForm.teachingAid')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="boardWork"
            errorMessage={t('addUpdateForm.errors.boardWork.required')}
            label={t('addUpdateForm.boardWork')}
            placeholder={t('addUpdateForm.boardWork')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="objectives"
            errorMessage={t('addUpdateForm.errors.objectives.required')}
            label={t('addUpdateForm.objectives')}
            placeholder={t('addUpdateForm.objectives')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="teacherProcedure"
            errorMessage={t('addUpdateForm.errors.teacherProcedure.required')}
            label={t('addUpdateForm.teacherProcedure')}
            placeholder={t('addUpdateForm.teacherProcedure')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="studentProcedure"
            errorMessage={t('addUpdateForm.errors.studentProcedure.required')}
            label={t('addUpdateForm.studentProcedure')}
            placeholder={t('addUpdateForm.studentProcedure')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="onlineMedium"
            errorMessage={t('addUpdateForm.errors.onlineMedium.required')}
            label={t('addUpdateForm.onlineMedium')}
            placeholder={t('addUpdateForm.onlineMedium')}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Input
            // @ts-expect-error
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            name="homeWork"
            errorMessage={t('addUpdateForm.errors.homeWork.required')}
            label={t('addUpdateForm.homeWork')}
            placeholder={t('addUpdateForm.homeWork')}
            rows={3}
          />
        </div>
        {isError && (
          <p className="text-danger mb-4">{'Something went wrong, please try again later'}</p>
        )}
        {isSuccess && (
          <p className="text-success mb-4">
            <Trans i18nKey={'addUpdateForm.root.success'}>
              Update inserted successfully,{' '}
              <Link className="text-primary" to="/dashboard">
                go to dashboard
              </Link>
            </Trans>
          </p>
        )}
        <Button
          disabled={isPending}
          isFullWidth={true}
          size={'lg'}
          type="submit"
          label={t('addUpdateForm.save')}
        ></Button>
      </form>
    </Card>
  );
};
