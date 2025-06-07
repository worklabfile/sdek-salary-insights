
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown } from 'lucide-react';

const SalaryComparison = () => {
  const comparisonData = [
    {
      position: 'Курьер',
      city: 'Иркутск',
      marketMedian: 109971,
      cdekSalary: 106794,
      difference: -3177,
      percentDiff: -2.9,
      marketQ1: 95000,
      marketQ3: 125000
    },
    {
      position: 'Кладовщик',
      city: 'Иркутск',
      marketMedian: 95500,
      cdekSalary: 98000,
      difference: 2500,
      percentDiff: 2.6,
      marketQ1: 85000,
      marketQ3: 110000
    }
  ];

  return (
    <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Сравнение с рынком</CardTitle>
        <p className="text-sm text-muted-foreground">Позиция СДЭК относительно медианы рынка</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comparisonData.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.position}</div>
                  <div className="text-xs text-muted-foreground">{item.city}</div>
                </div>
                <Badge 
                  variant={item.difference >= 0 ? "default" : "destructive"}
                  className={`${item.difference >= 0 ? 'bg-cdek-success/10 text-cdek-success border-cdek-success/20' : ''}`}
                >
                  {item.difference >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {item.percentDiff}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ЗП СДЭК: {item.cdekSalary.toLocaleString()} ₽</span>
                  <span>Медиана: {item.marketMedian.toLocaleString()} ₽</span>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={Math.min(100, (item.cdekSalary / item.marketQ3) * 100)}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Q1: {item.marketQ1.toLocaleString()}</span>
                    <span>Q3: {item.marketQ3.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {item.difference < 0 && (
                <div className="p-2 bg-cdek-warning/5 border border-cdek-warning/20 rounded text-xs">
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
