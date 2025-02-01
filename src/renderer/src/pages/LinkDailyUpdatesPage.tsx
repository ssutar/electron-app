import { useSetBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumb';
import { DailyUpdateForm } from '@/components/DailyUpdates/DailyUpdateForm';
import { formatDate } from '@/utils/date';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const LinkDailyUpdatesPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date') || formatDate(new Date());
  useSetBreadcrumbs([
    { name: t('breadcrumb.dailyUpdates'), path: '/daily-updates' },
    { name: t('breadcrumb.addDailyUpdates'), path: '/daily-updates/add' },
  ]);
  // `Link daily updates for ${currentDate}`
  return <DailyUpdateForm date={currentDate} />;
};
