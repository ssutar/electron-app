import { ISubject, IUpdateFormData } from '@interfaces/models';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export type UpdateFormProps = {
  onSuccess: () => void;
};

export const UpdateForm = ({ onSuccess }: UpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateFormData>();
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const onUpdateSubmit = (data: IUpdateFormData) => {
    if (authUser?.id) {
      data.teacherId = authUser.id;
    }

    window.api.insertUpdate(data).then(onSuccess);
  };

  useEffect(() => {
    if (authUser?.id) {
      window.api.getAllSubjects(authUser.id).then(setSubjects);
    }
  }, []);

  return (
    <form style={{ padding: '2rem' }} onSubmit={handleSubmit(onUpdateSubmit)}>
      <fieldset>
        <div className="grid">
          <label>
            {t('addUpdateForm.grade')}
            <select
              {...register('grade', { required: true })}
              aria-label={t('addUpdateForm.selectGrade')}
              defaultValue={t('addUpdateForm.selectGrade')}
              aria-invalid={errors.grade ? 'true' : 'false'}
            >
              {/* <option selected disabled value="">
                {t('addUpdateForm.selectGrade')}
              </option> */}
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {' '}
                  {grade}{' '}
                </option>
              ))}
            </select>
            {errors.grade && <small>{t('addUpdateForm.errors.grade.required')}</small>}
          </label>
          <label>
            {t('addUpdateForm.subject')}
            <select
              {...register('subjectId', { required: true })}
              aria-invalid={errors.subjectId ? 'true' : 'false'}
            >
              {subjects.map((subject) => {
                return (
                  <option value={subject.id} key={subject.id}>
                    {subject.title}
                  </option>
                );
              })}
            </select>
            {errors.subjectId && <small>{t('addUpdateForm.errors.subject.required')}</small>}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.teachingMethod')}
            <textarea
              {...register('teachingMethod', { required: true })}
              placeholder={t('addUpdateForm.teachingMethod')}
              aria-invalid={errors.teachingMethod ? 'true' : 'false'}
              rows={3}
            />
            {errors.teachingMethod && (
              <small>{t('addUpdateForm.errors.teachingMethod.required')}</small>
            )}
          </label>
          <label>
            {t('addUpdateForm.teachingAid')}
            <textarea
              {...register('teachingAid', { required: true })}
              placeholder={t('addUpdateForm.teachingAid')}
              aria-invalid={errors.teachingAid ? 'true' : 'false'}
              rows={3}
            />
            {errors.teachingAid && <small>{t('addUpdateForm.errors.teachingAid.required')}</small>}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.boardWork')}
            <textarea
              {...register('boardWork', { required: true })}
              placeholder={t('addUpdateForm.boardWork')}
              aria-invalid={errors.boardWork ? 'true' : 'false'}
              rows={3}
            />
            {errors.boardWork && <small>{t('addUpdateForm.errors.boardWork.required')}</small>}
          </label>
          <label>
            {t('addUpdateForm.objectives')}
            <textarea
              {...register('objectives', { required: true })}
              placeholder={t('addUpdateForm.objectives')}
              aria-invalid={errors.objectives ? 'true' : 'false'}
              rows={3}
            />
            {errors.objectives && <small>{t('addUpdateForm.errors.objectives.required')}</small>}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.teacherProcedure')}
            <textarea
              {...register('teacherProcedure', { required: true })}
              placeholder={t('addUpdateForm.teacherProcedure')}
              aria-invalid={errors.teacherProcedure ? 'true' : 'false'}
              rows={3}
            />
            {errors.teacherProcedure && (
              <small>{t('addUpdateForm.errors.teacherProcedure.required')}</small>
            )}
          </label>
          <label>
            {t('addUpdateForm.studentProcedure')}
            <textarea
              {...register('studentProcedure', { required: true })}
              placeholder={t('addUpdateForm.studentProcedure')}
              aria-invalid={errors.studentProcedure ? 'true' : 'false'}
              rows={3}
            />
            {errors.studentProcedure && (
              <small>{t('addUpdateForm.errors.studentProcedure.required')}</small>
            )}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.onlineMedium')}
            <textarea
              {...register('onlineMedium', { required: true })}
              placeholder={t('addUpdateForm.onlineMedium')}
              aria-invalid={errors.onlineMedium ? 'true' : 'false'}
              rows={3}
            />
            {errors.onlineMedium && (
              <small>{t('addUpdateForm.errors.onlineMedium.required')}</small>
            )}
          </label>
          <label>
            {t('addUpdateForm.homeWork')}
            <textarea
              {...register('homeWork', { required: true })}
              placeholder={t('addUpdateForm.homeWork')}
              aria-invalid={errors.homeWork ? 'true' : 'false'}
              rows={3}
            />
            {errors.homeWork && <small>{t('addUpdateForm.errors.homeWork.required')}</small>}
          </label>
        </div>
      </fieldset>
      <button type="submit">{t('addUpdateForm.save')}</button>
    </form>
  );
};
