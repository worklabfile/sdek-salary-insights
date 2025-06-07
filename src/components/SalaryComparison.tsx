
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSalaryComparison } from '@/lib/api';

const SalaryComparison = () => {
  const isMobile = useIsMobile();
  const { data: comparisonData, isLoading } = useSalaryComparison();

  if (isLoading) {
    return (
      <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className={isMobile ? 'p-4 pb-3' : ''}>
          <CardTitle className={`flex items-center gap-2 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            <TrendingUp className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            Сравнение с рынком
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className={isMobile ? 'p-4 pb-3' : ''}>
        <CardTitle className={`flex items-center gap-2 ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}>
          <TrendingUp className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          Сравнение с рынком
        </CardTitle>
        <p className={`text-muted-foreground ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          Позиция СДЭК относительно медианы рынка
        </p>
      </CardHeader>
      <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
        <div className={`space-y-4 ${isMobile ? 'space-y-4' : 'space-y-6'}`}>
          {comparisonData?.map((item, index) => (
            <div key={index} className={`space-y-2 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className={`font-medium truncate ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>
                    {item.position}
                  </div>
                  <div className={`text-muted-foreground ${
                    isMobile ? 'text-xs' : 'text-xs'
                  }`}>
                    {item.city}
                  </div>
                </div>
                <Badge 
                  variant={item.difference >= 0 ? "default" : "destructive"}
                  className={`${item.difference >= 0 ? 'bg-cdek-success/10 text-cdek-success border-cdek-success/20' : ''} ${
                    isMobile ? 'text-xs px-2 py-1' : ''
                  }`}
                >
                  {item.difference >= 0 ? 
                    <ArrowUp className="w-3 h-3 mr-1" /> : 
                    <ArrowDown className="w-3 h-3 mr-1" />
                  }
                  {item.percentDiff}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className={`flex justify-between gap-2 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  <span className="truncate">ЗП СДЭК: {item.cdekSalary.toLocaleString()} ₽</span>
                  <span className="whitespace-nowrap">Медиана: {item.marketMedian.toLocaleString()} ₽</span>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={Math.min(100, (item.cdekSalary / item.marketQ3) * 100)}
                    className={`${isMobile ? 'h-1.5' : 'h-2'}`}
                  />
                  <div className={`flex justify-between text-muted-foreground mt-1 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  }`}>
                    <span>Q1: {item.marketQ1.toLocaleString()}</span>
                    <span>Q3: {item.marketQ3.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {item.difference < 0 && (
                <div className={`p-2 bg-cdek-warning/5 border border-cdek-warning/20 rounded ${
                  isMobile ? 'text-xs p-2' : 'text-xs'
                }`}>
                  <strong>Рекомендация:</strong> Увеличить ЗП на {Math.abs(item.difference).toLocaleString()} ₽ 
                  для достижения медианы рынка
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComparison;
