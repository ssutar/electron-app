import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { DaySpecialsTable } from '@/components/DaySpecials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const DaySpecialsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([{ name: t('breadcrumb.daySpecials'), path: '/day-specials' }]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('daySpecialsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DaySpecialsTable />
        </CardContent>
      </Card>
    </>
  );
};
