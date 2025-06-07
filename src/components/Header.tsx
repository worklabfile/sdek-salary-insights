
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 mr-8">
          <div className="w-8 h-8 bg-cdek-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">С</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-cdek-green">СДЭК Salary Monitor</h1>
            <p className="text-xs text-muted-foreground">Система мониторинга зарплат</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Поиск по должностям, компаниям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border/50 focus:border-primary"
            />
          </div>

          <Select>
            <SelectTrigger className="w-[180px] border-border/50">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="week">Последняя неделя</SelectItem>
              <SelectItem value="month">Последний месяц</SelectItem>
              <SelectItem value="quarter">Последний квартал</SelectItem>
              <SelectItem value="year">Последний год</SelectItem>
              <SelectItem value="custom">Произвольный период</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[160px] border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Регион" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="moscow">Москва</SelectItem>
              <SelectItem value="spb">Санкт-Петербург</SelectItem>
              <SelectItem value="irkutsk">Иркутск</SelectItem>
              <SelectItem value="novosibirsk">Новосибирск</SelectItem>
              <SelectItem value="all">Все регионы</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-3 ml-4">
          <Badge variant="outline" className="bg-cdek-success/10 text-cdek-success border-cdek-success/20">
            Парсинг активен
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            2,847 записей
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
