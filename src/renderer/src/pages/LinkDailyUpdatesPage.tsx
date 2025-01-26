import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { DailyUpdateForm } from '@renderer/components/DailyUpdates/DailyUpdateForm';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const LinkDailyUpdatesPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date') || '';
  // `Link daily updates for ${currentDate}`
  return (
    <>
      <Breadcrumb title={t('linkDailyUpdatesPage.title')} />
      <DailyUpdateForm date={currentDate} />
    </>
  );
};
