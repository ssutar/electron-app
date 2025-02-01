import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CircleCheckBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const StatusPage = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={cn('flex justify-center items-center flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden max-w-md min-h-[80dvh] flex flex-col">
        {/* <CardHeader>
          <CardTitle className="text-2xl"></CardTitle>
        </CardHeader> */}
        <CardContent className="flex-1 flex flex-col justify-center items-center px-12">
          <CircleCheckBig size={80} className="text-green-700/90 text-center" />
          <h2 className="mt-6 text-xl text-center">
            {state?.message ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.'}
          </h2>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate('/')}>
            {t('statusPage.goToHomePage')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
