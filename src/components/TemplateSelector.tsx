import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  isCustom: boolean;
}

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customizing, setCustomizing] = useState(false);
  const [customFields, setCustomFields] = useState<TemplateField[]>([]);

  const predefinedTemplates: Template[] = [
    {
      id: 'delivery-basic',
      name: 'Доставка базовый',
      description: 'Основные поля для вакансий курьеров',
      category: 'Доставка',
      isCustom: false,
      fields: [
        { id: 'position', name: 'Должность', type: 'text', required: true },
        { id: 'company', name: 'Компания', type: 'text', required: true },
        { id: 'salary', name: 'Зарплата', type: 'number', required: true },
        { id: 'city', name: 'Город', type: 'text', required: true }
      ]
    },
    {
      id: 'delivery-extended',
      name: 'Доставка расширенный',
      description: 'Полный набор полей с дополнительными параметрами',
      category: 'Доставка',
      isCustom: false,
      fields: [
        { id: 'position', name: 'Должность', type: 'text', required: true },
        { id: 'company', name: 'Компания', type: 'text', required: true },
        { id: 'salary', name: 'Зарплата', type: 'number', required: true },
        { id: 'city', name: 'Город', type: 'text', required: true },
        { id: 'points_count', name: 'Количество точек', type: 'number', required: false },
        { id: 'fuel', name: 'ГСМ', type: 'checkbox', required: false },
        { id: 'parking', name: 'Парковка', type: 'checkbox', required: false },
        { id: 'schedule', name: 'График работы', type: 'text', required: false },
        { id: 'benefits', name: 'Бенефиты', type: 'text', required: false }
      ]
    },
    {
      id: 'warehouse',
      name: 'Склад',
      description: 'Шаблон для складских позиций',
      category: 'Склад',
      isCustom: false,
      fields: [
        { id: 'position', name: 'Должность', type: 'text', required: true },
        { id: 'company', name: 'Компания', type: 'text', required: true },
        { id: 'salary', name: 'Зарплата', type: 'number', required: true },
        { id: 'city', name: 'Город', type: 'text', required: true },
        { id: 'shift_type', name: 'Тип смены', type: 'select', required: false, options: ['Дневная', 'Ночная', 'Сменная'] },
        { id: 'warehouse_size', name: 'Размер склада', type: 'text', required: false }
      ]
    }
  ];

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id);
    setCustomFields(template.fields);
    onSelectTemplate(template.id);
  };

  const handleCustomizeTemplate = () => {
    setCustomizing(true);
  };

  const addCustomField = () => {
    const newField: TemplateField = {
      id: `custom_${Date.now()}`,
      name: '',
      type: 'text',
      required: false
    };
    setCustomFields([...customFields, newField]);
  };

  const updateCustomField = (index: number, field: Partial<TemplateField>) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], ...field };
    setCustomFields(updated);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Шаблоны данных</h2>
          <p className="text-muted-foreground">Выберите предустановленный шаблон или создайте свой</p>
        </div>
        <Button onClick={addCustomField} className="bg-cdek-gradient hover:opacity-90">
          Создать шаблон
        </Button>
      </div>

      {!customizing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predefinedTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm ${
                selectedTemplate === template.id ? 'ring-2 ring-primary shadow-cdek' : ''
              }`}
              onClick={() => handleSelectTemplate(template)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Поля ({template.fields.length}):</div>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.slice(0, 5).map((field) => (
                      <Badge key={field.id} variant="secondary" className="text-xs">
                        {field.name}
                      </Badge>
                    ))}
                    {template.fields.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 5} еще
                      </Badge>
                    )}
                  </div>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full bg-cdek-gradient hover:opacity-90"
                      onClick={() => onSelectTemplate(template.id)}
                    >
                      Использовать шаблон
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-primary hover:bg-primary/5"
                      onClick={handleCustomizeTemplate}
                    >
                      Настроить шаблон
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-cdek border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Настройка шаблона</CardTitle>
            <p className="text-muted-foreground">Добавьте, удалите или измените поля шаблона</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {customFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-center p-4 border rounded-lg border-border/50 bg-muted/20">
                <div className="col-span-3">
                  <Input
                    placeholder="Название поля"
                    value={field.name}
                    onChange={(e) => updateCustomField(index, { name: e.target.value })}
                    className="border-border/50"
                  />
                </div>
                <div className="col-span-2">
                  <Select value={field.type} onValueChange={(value: any) => updateCustomField(index, { type: value })}>
                    <SelectTrigger className="border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="text">Текст</SelectItem>
                      <SelectItem value="number">Число</SelectItem>
                      <SelectItem value="select">Выбор</SelectItem>
                      <SelectItem value="checkbox">Чекбокс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(checked) => updateCustomField(index, { required: !!checked })}
                  />
                  <span className="text-sm">Обязательное</span>
                </div>
                <div className="col-span-4">
                  {field.type === 'select' && (
                    <Input
                      placeholder="Варианты через запятую"
                      value={field.options?.join(', ') || ''}
                      onChange={(e) => updateCustomField(index, { options: e.target.value.split(', ') })}
                      className="border-border/50"
                    />
                  )}
                </div>
                <div className="col-span-1">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeCustomField(index)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCustomizing(false)}>
                Отмена
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={addCustomField}>
                  Добавить поле
                </Button>
                <Button className="bg-cdek-gradient hover:opacity-90">
                  Сохранить шаблон
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplateSelector;
