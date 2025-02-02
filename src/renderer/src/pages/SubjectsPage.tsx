import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { SubjectsTable } from '@/components/Subjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const SubjectsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([{ name: t('breadcrumb.subjects'), path: '/subjects' }]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('subjectsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectsTable />
        </CardContent>
      </Card>
    </>
  );
};
