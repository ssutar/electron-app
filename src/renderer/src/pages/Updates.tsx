import { UpdatesTable } from '../components/Updates/UpdatesTable';
import { useTranslation } from 'react-i18next';
import { IUpdate } from '@interfaces/models';
import { useAuth } from '../components/AuthContext';
import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@renderer/components/UI/Spinner';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const Updates = () => {
  const { authUser } = useAuth();
  const { t } = useTranslation();

  const {
    data: updates,
    isLoading,
    isSuccess
  } = useQuery<IUpdate[]>({
    queryKey: ['updates', authUser?.id],
    queryFn: async () => {
      await sleep(5000);
      return window.api.getAllUpdates(authUser?.id || '');
    },
    enabled: !!authUser?.id
  });

  return (
    <>
      <Breadcrumb title={t('updatesPage.title')} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {isLoading && (
            <div className="grid place-items-center p-4 gap-4">
              <Spinner />
              <p>Loading...</p>
            </div>
          )}
          {isSuccess && (
            <UpdatesTable
              updates={updates}
              emptyState={<>No updates found, please add updates</>}
            />
          )}
        </div>
      </div>
    </>
  );
};
