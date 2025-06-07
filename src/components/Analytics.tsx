import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [selectedPosition, setSelectedPosition] = useState('courier');
  const [selectedCity, setSelectedCity] = useState('irkutsk');
  const [reportPeriod, setReportPeriod] = useState('6months');

  // Sample data for charts
  const salaryData = [
    { position: 'Курьер', market_median: 109971, cdek_salary: 106794, difference: -3177 },
    { position: 'Кладовщик', market_median: 95500, cdek_salary: 98000, difference: 2500 },
    { position: 'Водитель', market_median: 125000, cdek_salary: 122000, difference: -3000 },
    { position: 'Оператор', market_median: 78000, cdek_salary: 80000, difference: 2000 }
  ];

  const trendData = [
    { month: 'Янв', market: 105000, cdek: 103000 },
    { month: 'Фев', market: 107000, cdek: 104500 },
    { month: 'Мар', market: 108500, cdek: 105000 },
    { month: 'Апр', market: 109000, cdek: 106000 },
    { month: 'Май', market: 110000, cdek: 106500 },
    { month: 'Июн', market: 109971, cdek: 106794 }
  ];

  const sourceDistribution = [
    { name: 'hh.ru', value: 45, color: '#22c55e' },
    { name: 'Telegram', value: 25, color: '#3b82f6' },
    { name: 'ВКонтакте', value: 15, color: '#8b5cf6' },
    { name: 'Профсообщества', value: 10, color: '#f59e0b' },
    { name: 'Другие', value: 5, color: '#6b7280' }
  ];

  const generateReport = () => {
    console.log('Generating report for:', { selectedPosition, selectedCity, reportPeriod });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Аналитика и отчеты</h2>
          <p className="text-muted-foreground">Анализ данных о зарплатах и генерация отчетов</p>
        </div>
        <Button onClick={generateReport} className="bg-cdek-gradient hover:opacity-90">
          Создать отчет
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Фильтры анализа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Должность</label>
              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="courier">Курьер</SelectItem>
                  <SelectItem value="warehouse">Кладовщик</SelectItem>
                  <SelectItem value="driver">Водитель</SelectItem>
                  <SelectItem value="operator">Оператор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Город</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="irkutsk">Иркутск</SelectItem>
                  <SelectItem value="moscow">Москва</SelectItem>
                  <SelectItem value="spb">Санкт-Петербург</SelectItem>
                  <SelectItem value="novosibirsk">Новосибирск</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Период</label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="1month">Последний месяц</SelectItem>
                  <SelectItem value="3months">Последние 3 месяца</SelectItem>
                  <SelectItem value="6months">Последние 6 месяцев</SelectItem>
                  <SelectItem value="1year">Последний год</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Действие</label>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Применить фильтры
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto bg-card border border-border mb-6">
          <TabsTrigger value="comparison" className="text-xs sm:text-sm px-2 sm:px-3">Сравнение ЗП</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm px-2 sm:px-3">Тренды</TabsTrigger>
          <TabsTrigger value="sources" className="text-xs sm:text-sm px-2 sm:px-3">Источники</TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm px-2 sm:px-3">Рекомендации</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Сравнение зарплат СДЭК vs Рынок</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="position" 
                      stroke="hsl(var(--muted-foreground))"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value.toLocaleString()} ₽`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value.toLocaleString()} ₽`, '']}
                    />
                    <Bar dataKey="market_median" fill="hsl(var(--cdek-green))" name="Медиана рынка" />
                    <Bar dataKey="cdek_salary" fill="hsl(var(--primary))" name="ЗП СДЭК" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Ключевые метрики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm text-muted-foreground">Медиана рынка (Курьер, Иркутск)</div>
                    <div className="text-2xl font-bold">109,971 ₽</div>
                    <div className="text-sm text-cdek-success">Q1: 95,000 ₽ | Q3: 125,000 ₽</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Зарплата СДЭК</div>
                    <div className="text-2xl font-bold">106,794 ₽</div>
                    <Badge variant="destructive" className="mt-1">
                      -2.9% от медианы рынка
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-cdek-warning/5 rounded-lg border border-cdek-warning/20">
                    <div className="text-sm text-muted-foreground">Рекомендуемое увеличение</div>
                    <div className="text-2xl font-bold text-cdek-warning">+3,177 ₽</div>
                    <div className="text-sm">Для достижения медианы рынка</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Динамика зарплат по месяцам</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="market" stroke="hsl(var(--cdek-green))" strokeWidth={3} name="Рынок" />
                  <Line type="monotone" dataKey="cdek" stroke="hsl(var(--primary))" strokeWidth={3} name="СДЭК" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Распределение по источникам</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Статистика источников</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceDistribution.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{source.value}%</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round(2847 * source.value / 100)} вакансий
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Рекомендации по корректировке ЗП</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-cdek-error/5 border border-cdek-error/20 rounded-lg">
                    <div className="font-semibold text-cdek-error">Критично</div>
                    <div className="text-sm mt-1">Курьер (Иркутск): отставание на 2.9% от медианы рынка</div>
                    <div className="text-sm font-medium mt-2">Рекомендация: увеличить на 3,177 ₽</div>
                  </div>
                  
                  <div className="p-4 bg-cdek-warning/5 border border-cdek-warning/20 rounded-lg">
                    <div className="font-semibold text-cdek-warning">Внимание</div>
                    <div className="text-sm mt-1">Водитель: отставание на 2.4% от медианы рынка</div>
                    <div className="text-sm font-medium mt-2">Рекомендация: увеличить на 3,000 ₽</div>
                  </div>
                  
                  <div className="p-4 bg-cdek-success/5 border border-cdek-success/20 rounded-lg">
                    <div className="font-semibold text-cdek-success">Хорошо</div>
                    <div className="text-sm mt-1">Кладовщик: превышение медианы на 2.6%</div>
                    <div className="text-sm font-medium mt-2">Конкурентная позиция сохраняется</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Экспорт отчета</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="font-medium">Отчет по анализу зарплат</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Период: Последние 6 месяцев<br/>
                      Должность: Курьер<br/>
                      Город: Иркутск<br/>
                      Дата создания: {new Date().toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-cdek-gradient hover:opacity-90">
                      Скачать PDF отчет
                    </Button>
                    <Button variant="outline" className="w-full border-primary hover:bg-primary/5">
                      Экспорт в Excel
                    </Button>
                    <Button variant="outline" className="w-full border-primary hover:bg-primary/5">
                      Поделиться ссылкой
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
