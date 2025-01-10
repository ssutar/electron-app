import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ISchool, ISignupFormData } from '@interfaces/models';
import { useAuth } from '../AuthContext';

export const SignupForm = () => {
  const { t } = useTranslation();
  const [schools, setSchools] = useState<ISchool[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ISignupFormData>();

  const { signup } = useAuth();

  const onSignup = (data: ISignupFormData) => {
    console.log(data);
    signup(data);
  };

  useEffect(() => {
    window.api.getSchools().then(setSchools);
  }, []);

  return (
    <section className="container container-fixed">
      <form onSubmit={handleSubmit(onSignup)}>
        <fieldset>
          <label>
            {t('signupForm.email')}
            <input
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
              placeholder={t('signupForm.email')}
              type="email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <small>{t('signupForm.errors.email.required')}</small>}
          </label>
          <label>
            {t('signupForm.name')}
            <input
              {...register('name', { required: true })}
              placeholder={t('signupForm.name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && <small>{t('signupForm.errors.name.required')}</small>}
          </label>
          <label>
            {t('signupForm.school')}
            <select
              {...register('schoolId', { required: true })}
              aria-invalid={errors.schoolId ? 'true' : 'false'}
            >
              <option disabled value={0}>
                {t('signupForm.selectSchool')}
              </option>
              {schools.map((sch) => {
                return (
                  <option value={sch.id} key={sch.id}>
                    {sch.name} {sch.address}
                  </option>
                );
              })}
            </select>
            {errors.schoolId && <small>{t('signupForm.errors.school.required')}</small>}
          </label>
          <label>
            {t('signupForm.password')}
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder={t('signupForm.password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <small>{t('signupForm.errors.password.required')}</small>}
          </label>
          <label>
            {t('signupForm.confirmPassword')}
            <input
              {...register('confirmPassword', {
                required: true,
                validate: (value) => {
                  const password = getValues('password');
                  return password === value;
                }
              })}
              type="password"
              placeholder={t('signupForm.confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            {errors.confirmPassword && <small>{t('signupForm.errors.password.shouldMatch')}</small>}
          </label>
          <button type="submit">{t('signupForm.signup')}</button>
          {t('signupForm.loginText')}
          <Link to={'/login'} style={{ paddingLeft: 'var(--pico-spacing)' }}>
            {t('signupForm.login')}
          </Link>
        </fieldset>
      </form>
    </section>
  );
};
