import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { DaySpecialsForm } from '@/components/DaySpecials';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const AddDaySpecialsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([
    { name: t('breadcrumb.daySpecials'), path: '/day-specials' },
    { name: t('breadcrumb.addDaySpecials'), path: '/day-specials/add' },
  ]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('addDaySpecialsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-right">
            <Button asChild variant={'link'}>
              <Link to={`/day-specials`}>
                <ArrowLeft /> {t('addDaySpecialsPage.backToDaySpecialsPage')}
              </Link>
            </Button>
          </div>
          <DaySpecialsForm />
        </CardContent>
      </Card>
    </>
  );
};
