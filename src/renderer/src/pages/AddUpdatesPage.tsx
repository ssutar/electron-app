import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { UpdateForm } from '@/components/Updates/UpdateForm';
import { useTranslation } from 'react-i18next';

export const AddUpdatesPage = () => {
  const { t } = useTranslation();
  useSetBreadcrumbs([
    { name: t('breadcrumb.updates'), path: '/updates' },
    { name: t('breadcrumb.addUpdates'), path: '/updates/add' },
  ]);
  return <UpdateForm />;
};
