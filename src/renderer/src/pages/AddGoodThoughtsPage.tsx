import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { GoodThoughtsForm } from '@/components/GoodThoughts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const AddGoodThoughtsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([
    { name: t('breadcrumb.goodThoughts'), path: '/good-thoughts' },
    { name: t('breadcrumb.addGoodThoughts'), path: '/good-thoughts/add' },
  ]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('addGoodThoughtsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-right">
            <Button asChild variant={'link'}>
              <Link to={`/good-thoughts`}>
                <ArrowLeft /> {t('addGoodThoughtsPage.backToGoodThoughtsPage')}
              </Link>
            </Button>
          </div>
          <GoodThoughtsForm />
        </CardContent>
      </Card>
    </>
  );
};
