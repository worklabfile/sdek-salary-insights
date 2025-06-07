
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Search, Grid2x2, List, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import TemplateSelector from '@/components/TemplateSelector';
import DataEntryForm from '@/components/DataEntryForm';
import Analytics from '@/components/Analytics';
import SalaryComparison from '@/components/SalaryComparison';
import SourcesManager from '@/components/SourcesManager';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const statsCards = [
    {
      title: 'Собранные вакансии',
      value: '2,847',
      change: '+12%',
      isPositive: true,
      description: 'За последний месяц'
    },
    {
      title: 'Медианная ЗП (рынок)',
      value: '109,971 ₽',
      change: '+3.2%',
      isPositive: true,
      description: 'Курьер, Иркутск'
    },
    {
      title: 'ЗП СДЭК',
      value: '106,794 ₽',
      change: '-2.9%',
      isPositive: false,
      description: 'Отставание от рынка'
    },
    {
      title: 'Рекомендация',
      value: '+3,177 ₽',
      change: '+3%',
      isPositive: true,
      description: 'Увеличить для конкурентности'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cdek-green-light/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px] mx-auto bg-card border border-border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="data-entry" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Ввод данных
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Источники
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <Card key={index} className="hover:shadow-cdek transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{stat.value}</div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={stat.isPositive ? "default" : "destructive"}
                        className={`text-xs ${stat.isPositive ? 'bg-cdek-success/10 text-cdek-success border-cdek-success/20' : ''}`}
                      >
                        {stat.isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 bg-cdek-gradient hover:opacity-90 text-primary-foreground"
                    onClick={() => setActiveTab('data-entry')}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Добавить вакансию</div>
                      <div className="text-xs opacity-90">Ручной ввод данных</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 border-primary hover:bg-primary/5"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Создать отчет</div>
                      <div className="text-xs text-muted-foreground">Аналитика и визуализация</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 border-primary hover:bg-primary/5"
                    onClick={() => setActiveTab('sources')}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Настроить парсинг</div>
                      <div className="text-xs text-muted-foreground">Автоматический сбор данных</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity & Salary Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Недавняя активность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Добавлена вакансия', details: 'Курьер • ООО "Конкурент" • 110,000 ₽', time: '5 мин назад' },
                      { action: 'Обновлен парсинг', details: 'hh.ru • 15 новых вакансий', time: '20 мин назад' },
                      { action: 'Создан отчет', details: 'Анализ ЗП курьеров в Иркутске', time: '1 час назад' }
                    ].map((activity, index) => (
                      <div key={index} className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                        <div>
                          <div className="font-medium text-sm">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.details}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <SalaryComparison />
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="animate-fade-in">
            <TemplateSelector onSelectTemplate={setSelectedTemplate} />
          </TabsContent>

          {/* Data Entry Tab */}
          <TabsContent value="data-entry" className="animate-fade-in">
            <DataEntryForm selectedTemplate={selectedTemplate} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="animate-fade-in">
            <Analytics />
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="animate-fade-in">
            <SourcesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
