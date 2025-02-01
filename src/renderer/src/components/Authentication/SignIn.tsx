import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ILoginFormData } from '@interfaces/models';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/components/AuthContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import MobileAppIllustration from '../../assets/illustrations/undraw_mobile-application_lhsq.svg';

const SignIn: React.FC = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const { t } = useTranslation();

  const form = useForm<ILoginFormData>();
  const { login } = useAuth();

  const onLogin = async (data: ILoginFormData) => {
    try {
      await login(data);
    } catch (e: unknown) {
      console.log({ error: e });
      form.setError('root.serverError', {
        type: ((e as Error)?.cause as string) || 'unknown',
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 items-center">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onLogin)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">{t('loginForm.title')}</h1>
                  <p className="text-balance text-muted-foreground">{t('loginForm.subtitle')}</p>
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">{t('loginForm.email')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder={t('loginForm.emailPlaceholder')}
                          formNoValidate
                        />
                      </FormControl>
                      <FormErrorMessage>{t('loginForm.errors.email.required')}</FormErrorMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">{t('loginForm.password')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder={t('loginForm.passwordPlaceholder')}
                        />
                      </FormControl>
                      <FormErrorMessage>{t('loginForm.errors.password.required')}</FormErrorMessage>
                    </FormItem>
                  )}
                />
                <FormErrorMessage field="root">
                  {t('loginForm.errors.root.invalid')}
                </FormErrorMessage>
                <Button type="submit" className="w-full">
                  {t('loginForm.login')}
                </Button>
                <div className="text-center text-sm">
                  {t('loginForm.signupText')}{' '}
                  <Link to={'/signup'} className="underline underline-offset-4">
                    {t('loginForm.signup')}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden md:grid bg-white/80 grid-cols-1 justify-center items-center px-4">
            <img
              src={MobileAppIllustration}
              alt="Image"
              className="object-cover dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {/* By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>. */}
        {t('loginForm.policy')}
      </div>
    </div>
  );
};

export default SignIn;
