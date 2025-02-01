import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IDailyUpdate } from '@interfaces/models';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTableRenderer } from '@/components/ui/data-table-renderer';
import { Label } from '@/components/ui/label';
import { Edit, Plus } from 'lucide-react';

export type DailyUpdatesTableType = {
  dailyUpdates: IDailyUpdate[];
  currentDate: Date;
  handleRegisterPrint: () => void;
  goodThought?: string;
  daySpecial?: string;
};

export const DailyUpdatesTable = ({
  currentDate,
  dailyUpdates,
  handleRegisterPrint,
  goodThought,
  daySpecial,
}: DailyUpdatesTableType) => {
  const { t } = useTranslation();

  const dateString = useMemo(() => formatDate(currentDate), [currentDate]);

  const { table } = useDataTable<IDailyUpdate>({
    tableId: 'dailyUpdatesTable',
    columnIds: [
      'period',
      'grade',
      'subject',
      'teachingMethod',
      'teachingAid',
      'boardWork',
      'objectives',
      'teacherProcedure',
      'studentProcedure',
      'onlineMedium',
      'homeWork',
    ],
    data: dailyUpdates,
    filterByColumnId: 'subject',
    date: dateString,
  });

  // bg-slate-200/50 rounded p-6 pb-8 dark:bg-meta-4

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex justify-between gap-2 my-2">
        <div>
          <Label className="mr-4">{t('dailyUpdatesHeader.day')}</Label>
          <span>{currentDate.toLocaleString('default', { weekday: 'long' })}</span>
        </div>
        <div>
          <Label className="mr-4">{t('dailyUpdatesHeader.date')}</Label>
          <span>{dateString}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>
          <Label className="mr-4">{t('dailyUpdatesHeader.goodThought')}</Label>
          {goodThought || t('dailyUpdatesHeader.noGoodThought')}
        </p>
        <p>
          <Label className="mr-4">{t('dailyUpdatesHeader.daySpecial')}</Label>
          {daySpecial || t('dailyUpdatesHeader.noDaySpecial')}
        </p>
        <div className="text-right">
          <Button asChild variant={'link'}>
            <Link className="block text-right" to={`/daily-updates/add-header?date=${dateString}`}>
              <Edit /> {t('dailyUpdatesHeader.change', { date: dateString })}
            </Link>
          </Button>
        </div>
      </div>
      <hr />
      <div className="text-right">
        <Button asChild variant={'link'}>
          <Link to={`/daily-updates/add?date=${dateString}`}>
            <Plus />
            {t('dailyUpdatesTable.add', { date: dateString })}
          </Link>
        </Button>
      </div>
      <DataTableRenderer table={table} />
      <Button disabled={!dailyUpdates.length} onClick={handleRegisterPrint}>
        {t('dailyUpdatesTable.print')}
      </Button>
    </div>
  );
};
