import { IDailyUpdate } from '@interfaces/models';
import { useTranslation } from 'react-i18next';

export type DailyUpdateFormProps = {
  date: string;
};

export const DailyUpdateForm = ({ date }: DailyUpdateFormProps) => {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();

  const handleDailyUpdateSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('date', date);
    const update = {};
    for (const [key, value] of formData) {
      update[key] = value;
    }

    window.api.insertUpdate(update as IDailyUpdate);
  };

  return (
    <form style={{ padding: '2rem' }} onSubmit={handleDailyUpdateSubmit}>
      <fieldset>
        <div className="grid">
          <label>
            {t('addUpdateForm.date')} <br /> {date}
          </label>
          <label>
            {t('addUpdateForm.period')}
            <select
              name="period"
              defaultValue={t('addUpdateForm.selectPeriod')}
              aria-label={t('addUpdateForm.selectPeriod')}
              required
            >
              {/* <option selected disabled value="">
                {t('addUpdateForm.selectPeriod')}
              </option> */}
              {periods.map((p) => (
                <option key={p} value={p}>
                  {' '}
                  {p}{' '}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.grade')}
            <select
              name="grade"
              aria-label={t('addUpdateForm.selectGrade')}
              defaultValue={t('addUpdateForm.selectGrade')}
              required
            >
              {/* <option selected disabled value="">
                {t('addUpdateForm.selectGrade')}
              </option> */}
              {grades.map((g) => (
                <option key={g} value={g}>
                  {' '}
                  {g}{' '}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('addUpdateForm.subject')}
            <input name="subject" placeholder="Subject" />
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.teachingMethod')}
            <textarea name="teachingMethod" placeholder="Teaching method" rows={3} />
          </label>
          <label>
            {t('addUpdateForm.teachingAid')}
            <textarea name="teachingAid" placeholder="Teaching aid" rows={3} />
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.boardWork')}
            <textarea name="boardWork" placeholder="Board work" rows={3} />
          </label>
          <label>
            {t('addUpdateForm.objectives')}
            <textarea name="objectives" placeholder="Objectives" rows={3} />
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.teacherProcedure')}
            <textarea name="teacherProcedure" placeholder="Teacher procedure" rows={3} />
          </label>
          <label>
            {t('addUpdateForm.studentProcedure')}
            <textarea name="studentProcedure" placeholder="Student procedure" rows={3} />
          </label>
        </div>
        <div className="grid">
          <label>
            {t('addUpdateForm.onlineMedium')}
            <textarea name="onlineMedium" placeholder="Online medium" rows={3} />
          </label>
          <label>
            {t('addUpdateForm.homeWork')}
            <textarea name="homeWork" placeholder="Home work" rows={3} />
          </label>
        </div>
      </fieldset>
      <button type="submit">{t('addUpdateForm.save')}</button>
    </form>
  );
};
