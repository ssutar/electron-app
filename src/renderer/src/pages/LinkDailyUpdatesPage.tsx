import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { DailyUpdateForm } from '@renderer/components/DailyUpdates/DailyUpdateForm';
import { useSearchParams } from 'react-router-dom';

export const LinkDailyUpdatesPage = () => {
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date') || '';
  return (
    <>
      <Breadcrumb title={`Link daily updates for ${currentDate}`} />
      <DailyUpdateForm date={currentDate} />
    </>
  );
};
