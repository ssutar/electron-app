import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginFormData } from '@interfaces/models';
import { useAuth } from '../AuthContext';

export const LoginForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormData>();
  const { login } = useAuth();

  const onLogin = async (data: ILoginFormData) => {
    await login(data);
  };

  return (
    <section className="container container-fixed">
      <form onSubmit={handleSubmit(onLogin)}>
        <fieldset>
          <label>
            {t('loginForm.email')}
            <input
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
              type="email"
              placeholder="Email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <small>{t('loginForm.errors.email.required')}</small>}
          </label>
          <label>
            {t('loginForm.password')}
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <small>{t('loginForm.errors.password.required')}</small>}
          </label>
          <button type="submit">{t('loginForm.login')}</button>
          {t('loginForm.signupText')}
          <Link to={'/signup'} style={{ paddingLeft: 'var(--pico-spacing)' }}>
            {t('loginForm.signup')}
          </Link>
        </fieldset>
      </form>
    </section>
  );
};
