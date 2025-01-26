import { UpdatesTable } from '../components/Updates/UpdatesTable';
import { useTranslation } from 'react-i18next';
import { IUpdate } from '@interfaces/models';
import { useAuth } from '../components/AuthContext';
import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@renderer/components/UI/Card';
import { BlockLoader } from '@renderer/components/UI/Loaders';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
      await sleep(5000);
      return window.api.getAllUpdates(authUser?.id || '');
    },
    enabled: !!authUser?.id,
  });

  return (
    <>
      <Breadcrumb title={t('updatesPage.title')} />
      <Card>
        {isLoading && <BlockLoader />}
        {isSuccess && <UpdatesTable updates={updates} />}
      </Card>
    </>
  );
};
