
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const SourcesManager = () => {
  const { toast } = useToast();

  const sources = [
    {
      id: 1,
      name: 'hh.ru Курьеры Иркутск',
      url: 'https://hh.ru/search/vacancy?area=63&professional_role=40',
      type: 'hh.ru',
      status: 'active',
      lastScan: '5 мин назад',
      vacanciesFound: 87,
      isActive: true
    },
    {
      id: 2,
      name: 'Telegram: Работа курьером',
      url: 'https://t.me/courier_jobs_irkutsk',
      type: 'telegram',
      status: 'active',
      lastScan: '20 мин назад',
      vacanciesFound: 23,
      isActive: true
    },
    {
      id: 3,
      name: 'ВК: Вакансии Иркутск',
      url: 'https://vk.com/job_irkutsk',
      type: 'vk',
      status: 'error',
      lastScan: '2 часа назад',
      vacanciesFound: 0,
      isActive: false,
      error: 'Ошибка доступа к API'
    },
    {
      id: 4,
      name: 'Профсообщество логистов',
      url: 'https://logistics-community.ru/jobs',
      type: 'profcom',
      status: 'active',
      lastScan: '1 час назад',
      vacanciesFound: 12,
      isActive: true
    }
  ];

  const parsingStats = [
    { source: 'hh.ru', total: 1247, today: 34, success_rate: 98 },
    { source: 'Telegram', total: 523, today: 12, success_rate: 85 },
    { source: 'ВКонтакте', total: 312, today: 0, success_rate: 45 },
    { source: 'Профсообщества', total: 189, today: 8, success_rate: 92 }
  ];

  const toggleSource = (sourceId: number) => {
    toast({
      title: "Статус изменен",
      description: "Парсинг источника обновлен",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-cdek-success/10 text-cdek-success border-cdek-success/20';
      case 'error':
        return 'bg-cdek-error/10 text-cdek-error border-cdek-error/20';
      case 'paused':
        return 'bg-cdek-warning/10 text-cdek-warning border-cdek-warning/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-border/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hh.ru':
        return '🔍';
      case 'telegram':
        return '💬';
      case 'vk':
        return '📘';
      case 'profcom':
        return '👥';
      default:
        return '🌐';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление источниками</h2>
          <p className="text-muted-foreground">Мониторинг автоматического парсинга данных о вакансиях</p>
        </div>
      </div>

      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[300px] bg-card border border-border">
          <TabsTrigger value="sources">Источники</TabsTrigger>
          <TabsTrigger value="statistics">Статистика</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          {/* Sources List */}
          <div className="grid grid-cols-1 gap-4">
            {sources.map((source) => (
              <Card key={source.id} className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTypeIcon(source.type)}</div>
                      <div>
                        <div className="font-semibold">{source.name}</div>
                        <div className="text-sm text-muted-foreground">{source.url}</div>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusColor(source.status)}>
                            {source.status === 'active' ? 'Активен' : 
                             source.status === 'error' ? 'Ошибка' : 'Приостановлен'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Последнее сканирование: {source.lastScan}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="font-semibold text-lg">{source.vacanciesFound}</div>
                      <div className="text-xs text-muted-foreground">вакансий найдено</div>
                      <Switch
                        checked={source.isActive}
                        onCheckedChange={() => toggleSource(source.id)}
                      />
                    </div>
                  </div>
                  
                  {source.error && (
                    <div className="mt-3 p-2 bg-cdek-error/5 border border-cdek-error/20 rounded text-sm text-cdek-error">
                      {source.error}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Статистика парсинга</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsingStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stat.source}</span>
                        <span className="text-sm text-muted-foreground">
                          {stat.total} всего / {stat.today} сегодня
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Успешность парсинга</span>
                          <span>{stat.success_rate}%</span>
                        </div>
                        <Progress value={stat.success_rate} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Активность за сегодня</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm text-muted-foreground">Всего собрано</div>
                    <div className="text-2xl font-bold">54 вакансии</div>
                    <div className="text-sm text-cdek-success">+12% к вчерашнему дню</div>
                  </div>
                  
                  <div className="p-4 bg-cdek-success/5 rounded-lg border border-cdek-success/20">
                    <div className="text-sm text-muted-foreground">Новые компании</div>
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-sm">Ранее не отслеживались</div>
                  </div>
                  
                  <div className="p-4 bg-cdek-warning/5 rounded-lg border border-cdek-warning/20">
                    <div className="text-sm text-muted-foreground">Дубликаты удалены</div>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm">Автоматическая очистка</div>
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

export default SourcesManager;
