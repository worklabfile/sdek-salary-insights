
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, RefreshCw, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const RecentActivity = () => {
  const isMobile = useIsMobile();

  const activities = [
    {
      action: 'Добавлена вакансия',
      details: 'Курьер • ООО "Конкурент" • 110,000 ₽',
      time: '5 мин назад',
      icon: Plus,
      type: 'success'
    },
    {
      action: 'Обновлен парсинг',
      details: 'hh.ru • 15 новых вакансий',
      time: '20 мин назад',
      icon: RefreshCw,
      type: 'info'
    },
    {
      action: 'Создан отчет',
      details: 'Анализ ЗП курьеров в Иркутске',
      time: '1 час назад',
      icon: FileText,
      type: 'default'
    }
  ];

  return (
    <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className={isMobile ? 'p-4 pb-3' : ''}>
        <CardTitle className={`flex items-center gap-2 ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}>
          <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          Недавняя активность
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
        <div className={`space-y-3 ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors ${
                  isMobile ? 'p-3' : 'p-3'
                }`}
              >
                <div className={`p-1.5 rounded-full ${
                  activity.type === 'success' ? 'bg-cdek-success/20 text-cdek-success' :
                  activity.type === 'info' ? 'bg-blue-500/20 text-blue-600' :
                  'bg-primary/20 text-primary'
                }`}>
                  <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${
                    isMobile ? 'text-sm' : 'text-sm'
                  }`}>
                    {activity.action}
                  </div>
                  <div className={`text-muted-foreground truncate ${
                    isMobile ? 'text-xs' : 'text-xs'
                  }`}>
                    {activity.details}
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs whitespace-nowrap ${
                  isMobile ? 'text-xs px-2 py-1' : ''
                }`}>
                  {activity.time}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
