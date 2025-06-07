import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DataEntryFormProps {
  selectedTemplate: string;
}

const DataEntryForm = ({ selectedTemplate }: DataEntryFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Данные сохранены",
      description: "Вакансия успешно добавлена в базу данных",
    });

    setIsSubmitting(false);
    setFormData({});
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ввод данных о вакансии</h2>
        <p className="text-muted-foreground">Добавьте новую вакансию в систему мониторинга</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Должность *</Label>
                    <Input
                      id="position"
                      placeholder="Курьер, Кладовщик, Оператор..."
                      value={formData.position || ''}
                      onChange={(e) => updateFormData('position', e.target.value)}
                      className="border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Компания *</Label>
                    <Input
                      id="company"
                      placeholder="Название компании"
                      value={formData.company || ''}
                      onChange={(e) => updateFormData('company', e.target.value)}
                      className="border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Зарплата (₽) *</Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="110000"
                      value={formData.salary || ''}
                      onChange={(e) => updateFormData('salary', e.target.value)}
                      className="border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary_type">Тип зарплаты</Label>
                    <Select value={formData.salary_type || ''} onValueChange={(value) => updateFormData('salary_type', value)}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="gross">Gross (до вычета налогов)</SelectItem>
                        <SelectItem value="net">Net (на руки)</SelectItem>
                        <SelectItem value="from">От указанной суммы</SelectItem>
                        <SelectItem value="to">До указанной суммы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Город *</Label>
                    <Select value={formData.city || ''} onValueChange={(value) => updateFormData('city', value)}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="moscow">Москва</SelectItem>
                        <SelectItem value="spb">Санкт-Петербург</SelectItem>
                        <SelectItem value="irkutsk">Иркутск</SelectItem>
                        <SelectItem value="novosibirsk">Новосибирск</SelectItem>
                        <SelectItem value="other">Другой</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">График работы</Label>
                  <Input
                    id="schedule"
                    placeholder="5/2, полный день, сменный график..."
                    value={formData.schedule || ''}
                    onChange={(e) => updateFormData('schedule', e.target.value)}
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Бенефиты и условия</Label>
                  <Textarea
                    id="benefits"
                    placeholder="ДМС, бесплатное питание, корпоративная связь..."
                    value={formData.benefits || ''}
                    onChange={(e) => updateFormData('benefits', e.target.value)}
                    className="border-border/50 focus:border-primary min-h-[100px]"
                  />
                </div>

                {/* Additional fields for delivery positions */}
                {selectedTemplate === 'delivery-extended' && (
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h3 className="font-semibold text-primary">Дополнительные параметры для доставки</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="points_count">Количество точек за смену</Label>
                        <Input
                          id="points_count"
                          type="number"
                          placeholder="15"
                          value={formData.points_count || ''}
                          onChange={(e) => updateFormData('points_count', e.target.value)}
                          className="border-border/50 focus:border-primary"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fuel"
                            checked={formData.fuel || false}
                            onCheckedChange={(checked) => updateFormData('fuel', checked)}
                          />
                          <Label htmlFor="fuel">ГСМ оплачивается</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="parking"
                            checked={formData.parking || false}
                            onCheckedChange={(checked) => updateFormData('parking', checked)}
                          />
                          <Label htmlFor="parking">Парковка оплачивается</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline" type="button">
                    Очистить форму
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-cdek-gradient hover:opacity-90"
                  >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить вакансию'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Tips */}
        <div className="space-y-6">
          <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Статистика ввода</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Сегодня добавлено:</span>
                  <span className="font-semibold">23 вакансии</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">На этой неделе:</span>
                  <span className="font-semibold">187 вакансий</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ваш вклад:</span>
                  <span className="font-semibold text-cdek-green">15 записей</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Советы по заполнению</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <strong>Зарплата:</strong> Указывайте реальную сумму из объявления. Если указан диапазон, берите среднее значение.
                </div>
                <div className="p-3 bg-cdek-success/5 rounded-lg border border-cdek-success/20">
                  <strong>Должность:</strong> Используйте точное название из вакансии для лучшей классификации.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataEntryForm;
