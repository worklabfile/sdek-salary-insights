import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlusCircle, BarChart3, Settings, FileText } from 'lucide-react';

interface ResponsiveQuickActionsProps {
  onTabChange: (tab: string) => void;
}

const ResponsiveQuickActions = ({ onTabChange }: ResponsiveQuickActionsProps) => {
  const isMobile = useIsMobile();

  const actions = [
    {
      id: 'data-entry',
      title: 'Добавить вакансию',
      description: 'Ручной ввод данных',
      icon: PlusCircle,
      variant: 'default' as const,
      className: 'bg-cdek-gradient hover:opacity-90 text-primary-foreground'
    },
    {
      id: 'analytics',
      title: 'Создать отчет',
      description: 'Аналитика и визуализация',
      icon: BarChart3,
      variant: 'outline' as const,
      className: 'border-primary hover:bg-primary/5'
    }
  ];

  if (isMobile) {
    actions.push({
      id: 'templates',
      title: 'Шаблоны',
      description: 'Управление формами',
      icon: FileText,
      variant: 'outline' as const,
      className: 'border-primary hover:bg-primary/5'
    });
  }

  return (
    <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className={isMobile ? 'p-4 pb-3' : ''}>
        <CardTitle className={`font-semibold ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}>
          Быстрые действия
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
        <div className={`grid gap-3 sm:gap-4 ${
          isMobile 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant}
                className={`${action.className} ${
                  isMobile ? 'h-16 sm:h-20' : 'h-20'
                } flex-col space-y-1`}
                onClick={() => onTabChange(action.id)}
              >
                <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                <div className="text-center">
                  <div className={`font-semibold ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    {action.title}
                  </div>
                  <div className={`opacity-90 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } ${action.variant === 'outline' ? 'text-muted-foreground' : ''}`}>
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsiveQuickActions;
