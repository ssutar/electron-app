import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { SubjectsForm } from '@/components/Subjects/SubjectsForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const AddSubjectsPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([
    { name: t('breadcrumb.subjects'), path: '/subjects' },
    { name: t('breadcrumb.addSubjects'), path: '/subjects/add' },
  ]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('addSubjectsPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-right">
            <Button asChild variant={'link'}>
              <Link to={`/subjects`}>
                <ArrowLeft /> {t('addSubjectsPage.backToSubjectsPage')}
              </Link>
            </Button>
          </div>
          <SubjectsForm />
        </CardContent>
      </Card>
    </>
  );
};
