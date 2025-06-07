
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAnalytics, useSalaryComparison } from '@/lib/api';

const ResponsiveStatsCards = () => {
  const isMobile = useIsMobile();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: comparison, isLoading: comparisonLoading } = useSalaryComparison();

  const isLoading = analyticsLoading || comparisonLoading;

  const statsCards = [
    {
      title: 'Собранные вакансии',
      value: isLoading ? '...' : analytics?.count?.toLocaleString() || '2,847',
      change: '+12%',
      isPositive: true,
      description: 'За последний месяц'
    },
    {
      title: 'Медианная ЗП',
      value: isLoading ? '...' : `${analytics?.median?.toLocaleString() || '109,971'} ₽`,
      change: '+3.2%',
      isPositive: true,
      description: 'Курьер, Иркутск'
    },
    {
      title: 'ЗП СДЭК',
      value: isLoading ? '...' : `${comparison?.[0]?.cdekSalary?.toLocaleString() || '106,794'} ₽`,
      change: comparison?.[0]?.percentDiff ? `${comparison[0].percentDiff}%` : '-2.9%',
      isPositive: (comparison?.[0]?.percentDiff || -2.9) >= 0,
      description: 'Отставание от рынка'
    },
    {
      title: 'Рекомендация',
      value: isLoading ? '...' : `+${Math.abs(comparison?.[0]?.difference || 3177).toLocaleString()} ₽`,
      change: '+3%',
      isPositive: true,
      description: 'Увеличить для конкурентности'
    }
  ];

  return (
    <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
      isMobile 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }`}>
      {statsCards.map((stat, index) => (
        <Card 
          key={index} 
          className="hover:shadow-cdek transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
        >
          <CardHeader className={`pb-2 ${isMobile ? 'p-4' : 'pb-3'}`}>
            <CardTitle className={`font-medium text-muted-foreground ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
            <div className={`font-bold mb-2 ${
              isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
            }`}>
              {stat.value}
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={stat.isPositive ? "default" : "destructive"}
                className={`text-xs ${
                  stat.isPositive 
                    ? 'bg-cdek-success/10 text-cdek-success border-cdek-success/20' 
                    : ''
                }`}
              >
                {stat.isPositive ? 
                  <ArrowUp className="w-3 h-3 mr-1" /> : 
                  <ArrowDown className="w-3 h-3 mr-1" />
                }
                {stat.change}
              </Badge>
            </div>
            <p className={`text-muted-foreground mt-1 ${
              isMobile ? 'text-xs' : 'text-xs'
            }`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResponsiveStatsCards;
