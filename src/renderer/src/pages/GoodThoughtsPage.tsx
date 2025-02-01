import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { GoodThoughtsTable } from '@/components/GoodThoughts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const GoodThoughtsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([{ name: t('breadcrumb.goodThoughts'), path: '/good-thoughts' }]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('goodThoughtsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <GoodThoughtsTable />
        </CardContent>
      </Card>
    </>
  );
};
