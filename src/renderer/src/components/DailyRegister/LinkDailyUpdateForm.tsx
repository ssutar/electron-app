import { ISubject, ILinkDailyUpdateFormData, IUpdate } from '@interfaces/models';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { UpdatesTable } from '../Updates/UpdatesTable';

export type LinkDailyUpdateFormProps = {
  date: string;
  onSuccess: () => void;
};

export const LinkDailyUpdateForm = ({ date, onSuccess }: LinkDailyUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILinkDailyUpdateFormData>();
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [updates, setUpdates] = useState<IUpdate[]>([]);

  const onUpdateSubmit = (data: ILinkDailyUpdateFormData) => {
    if (authUser?.id) {
      data.teacherId = authUser.id;
    }

    // window.api.insertUpdate(data).then(onSuccess);
  };

  const onSearch = (data: ILinkDailyUpdateFormData) => {
    console.log(data);
    if (authUser?.id) {
      data.teacherId = authUser.id;
      window.api.searchUpdates(data).then(setUpdates);
    }
  };

  useEffect(() => {
    if (authUser?.id) {
      window.api.getAllSubjects(authUser.id).then(setSubjects);
    }
  }, []);

  return (
    <form style={{ padding: '2rem' }} onSubmit={handleSubmit(onUpdateSubmit)}>
      <fieldset>
        <section className="grid">
          <label>
            {t('linkDailyUpdateForm.date')} <br /> {date}
          </label>
          <label>
            {t('linkDailyUpdateForm.period')}
            <select
              name="period"
              defaultValue={t('linkDailyUpdateForm.selectPeriod')}
              aria-label={t('linkDailyUpdateForm.selectPeriod')}
              required
            >
              {/* <option selected disabled value="">
                {t('linkDailyUpdateForm.selectPeriod')}
              </option> */}
              {periods.map((p) => (
                <option key={p} value={p}>
                  {' '}
                  {p}{' '}
                </option>
              ))}
            </select>
          </label>
          {/* </section>
        <section className="grid"> */}
          <label>
            {t('linkDailyUpdateForm.grade')}
            <select
              {...register('grade', { required: true, valueAsNumber: true })}
              aria-label={t('linkDailyUpdateForm.selectGrade')}
              defaultValue={t('linkDailyUpdateForm.selectGrade')}
              aria-invalid={errors.grade ? 'true' : 'false'}
            >
              <option selected disabled value="">
                {t('linkDailyUpdateForm.selectGrade')}
              </option>

              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {' '}
                  {grade}{' '}
                </option>
              ))}
            </select>
            {errors.grade && <small>{t('linkDailyUpdateForm.errors.grade.required')}</small>}
          </label>

          <label>
            {t('linkDailyUpdateForm.subject')}
            <select
              {...register('subjectId', { required: true, valueAsNumber: true })}
              aria-label={t('linkDailyUpdateForm.selectSubject')}
              defaultValue={t('linkDailyUpdateForm.selectSubject')}
              aria-invalid={errors.subjectId ? 'true' : 'false'}
            >
              <option selected disabled value="">
                {t('linkDailyUpdateForm.selectSubject')}
              </option>
              {subjects.map((subject) => {
                return (
                  <option value={subject.id} key={subject.id}>
                    {subject.title}
                  </option>
                );
              })}
            </select>
            {errors.subjectId && <small>{t('linkDailyUpdateForm.errors.subject.required')}</small>}
          </label>
          {/* </section>
        <section className="grid"> */}
          <section style={{ alignSelf: 'center', paddingTop: 'calc(var(--pico-spacing) * 1.75)' }}>
            <button className="outline" onClick={handleSubmit(onSearch)}>
              {t('linkDailyUpdateForm.search')}
            </button>
          </section>
        </section>
        {updates.length ? (
          <UpdatesTable updates={updates} />
        ) : (
          <section>Please select the date, subject and grade to search for the updates</section>
        )}
        {/* <div className="grid">
          <label>
            {t('linkDailyUpdateForm.teachingMethod')}
            <textarea
              {...register('teachingMethod', { required: true })}
              placeholder={t('linkDailyUpdateForm.teachingMethod')}
              aria-invalid={errors.teachingMethod ? 'true' : 'false'}
              rows={3}
            />
            {errors.teachingMethod && (
              <small>{t('linkDailyUpdateForm.errors.teachingMethod.required')}</small>
            )}
          </label>
          <label>
            {t('linkDailyUpdateForm.teachingAid')}
            <textarea
              {...register('teachingAid', { required: true })}
              placeholder={t('linkDailyUpdateForm.teachingAid')}
              aria-invalid={errors.teachingAid ? 'true' : 'false'}
              rows={3}
            />
            {errors.teachingAid && (
              <small>{t('linkDailyUpdateForm.errors.teachingAid.required')}</small>
            )}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('linkDailyUpdateForm.boardWork')}
            <textarea
              {...register('boardWork', { required: true })}
              placeholder={t('linkDailyUpdateForm.boardWork')}
              aria-invalid={errors.boardWork ? 'true' : 'false'}
              rows={3}
            />
            {errors.boardWork && (
              <small>{t('linkDailyUpdateForm.errors.boardWork.required')}</small>
            )}
          </label>
          <label>
            {t('linkDailyUpdateForm.objectives')}
            <textarea
              {...register('objectives', { required: true })}
              placeholder={t('linkDailyUpdateForm.objectives')}
              aria-invalid={errors.objectives ? 'true' : 'false'}
              rows={3}
            />
            {errors.objectives && (
              <small>{t('linkDailyUpdateForm.errors.objectives.required')}</small>
            )}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('linkDailyUpdateForm.teacherProcedure')}
            <textarea
              {...register('teacherProcedure', { required: true })}
              placeholder={t('linkDailyUpdateForm.teacherProcedure')}
              aria-invalid={errors.teacherProcedure ? 'true' : 'false'}
              rows={3}
            />
            {errors.teacherProcedure && (
              <small>{t('linkDailyUpdateForm.errors.teacherProcedure.required')}</small>
            )}
          </label>
          <label>
            {t('linkDailyUpdateForm.studentProcedure')}
            <textarea
              {...register('studentProcedure', { required: true })}
              placeholder={t('linkDailyUpdateForm.studentProcedure')}
              aria-invalid={errors.studentProcedure ? 'true' : 'false'}
              rows={3}
            />
            {errors.studentProcedure && (
              <small>{t('linkDailyUpdateForm.errors.studentProcedure.required')}</small>
            )}
          </label>
        </div>
        <div className="grid">
          <label>
            {t('linkDailyUpdateForm.onlineMedium')}
            <textarea
              {...register('onlineMedium', { required: true })}
              placeholder={t('linkDailyUpdateForm.onlineMedium')}
              aria-invalid={errors.onlineMedium ? 'true' : 'false'}
              rows={3}
            />
            {errors.onlineMedium && (
              <small>{t('linkDailyUpdateForm.errors.onlineMedium.required')}</small>
            )}
          </label>
          <label>
            {t('linkDailyUpdateForm.homeWork')}
            <textarea
              {...register('homeWork', { required: true })}
              placeholder={t('linkDailyUpdateForm.homeWork')}
              aria-invalid={errors.homeWork ? 'true' : 'false'}
              rows={3}
            />
            {errors.homeWork && <small>{t('linkDailyUpdateForm.errors.homeWork.required')}</small>}
          </label>
        </div> */}
      </fieldset>

      <button type="submit">{t('linkDailyUpdateForm.link')}</button>
    </form>
  );
};
