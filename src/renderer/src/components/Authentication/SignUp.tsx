import React, { useEffect, useState } from 'react';
import { ISchool, ISignupFormData } from '@interfaces/models';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/components/AuthContext';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Link } from 'react-router-dom';
import Professor from '../../assets/illustrations/undraw_professor_d7zn.svg';

const SignUp: React.FC = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const { t } = useTranslation();
  const [schools, setSchools] = useState<ISchool[]>([]);
  const form = useForm<ISignupFormData>();
  const { signup } = useAuth();

  const onSignup = (data: ISignupFormData) => {
    console.log(data);
    signup(data);
  };

  useEffect(() => {
    window.api.getSchools().then((schools) => {
      setSchools(schools);
    });
  }, []);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSignup)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">{t('signupForm.title')}</h1>
                  <p className="text-balance text-muted-foreground">{t('signupForm.subtitle')}</p>
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">{t('signupForm.email')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder={t('signupForm.emailPlaceholder')}
                        />
                      </FormControl>
                      <FormErrorMessage>{t('signupForm.errors.email.required')}</FormErrorMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  name="name"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">{t('signupForm.name')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="name"
                          placeholder={t('signupForm.namePlaceholder')}
                        />
                      </FormControl>
                      <FormErrorMessage>{t('signupForm.errors.name.required')}</FormErrorMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  name="schoolId"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="schoolId">{t('signupForm.school')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('signupForm.schoolPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem value={`${school.id}`} key={school.id}>
                              {school.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormErrorMessage>{t('signupForm.errors.grade.required')}</FormErrorMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">{t('signupForm.password')}</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t('signupForm.passwordPlaceholder')}
                      />
                      <FormErrorMessage>
                        {t('signupForm.errors.password.required')}
                      </FormErrorMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        {t('signupForm.confirmPassword')}
                      </FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t('signupForm.confirmPasswordPlaceholder')}
                      />
                      <FormErrorMessage>
                        {t('signupForm.errors.confirmPassword.required')}
                      </FormErrorMessage>
                    </FormItem>
                  )}
                />

                <FormErrorMessage field="root">
                  {t('signupForm.errors.root.invalid')}
                </FormErrorMessage>

                <Button type="submit" className="w-full">
                  {t('signupForm.signup')}
                </Button>

                <div className="text-center text-sm">
                  {t('signupForm.loginText')}{' '}
                  <Link to={'/login'} className="underline underline-offset-4">
                    {t('signupForm.login')}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="hidden md:grid bg-white/80 px-4 grid-cols-1 justify-center items-center">
            <img src={Professor} alt="Image" className="object-cover dark:brightness-[0.8]" />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {/* By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>. */}
        {t('signupForm.policy')}
      </div>
    </div>
  );
};

export default SignUp;
