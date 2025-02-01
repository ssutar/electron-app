import { UpdatesTable } from '../components/Updates/UpdatesTable';
import { IUpdate } from '@interfaces/models';
import { useAuth } from '@/components/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { BlockLoader } from '@/components/ui/Loaders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';

// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const Updates = () => {
  const { authUser } = useAuth();
  const { t } = useTranslation();
  const {
    data: updates,
    isLoading,
    isSuccess,
  } = useQuery<IUpdate[]>({
    queryKey: ['updates', authUser?.id],
    queryFn: async () => {
      // await sleep(5000);
      return window.api.getAllUpdates(authUser?.id || '');
    },
    enabled: !!authUser?.id,
  });

  useSetBreadcrumbs([{ name: t('breadcrumb.updates'), path: '/updates' }]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t('updatesPage.title')}</CardTitle>
        <CardDescription>{t('updatesPage.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <BlockLoader />}
        {isSuccess && (
          <>
            <div className="text-right">
              <Button asChild variant={'link'}>
                <Link to={`/updates/add`}>
                  <Plus /> {t('updatesPage.add')}
                </Link>
              </Button>
            </div>
            <UpdatesTable updates={updates} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
