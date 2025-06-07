
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Filter, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavigation from './MobileNavigation';

interface ResponsiveHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResponsiveHeader = ({ activeTab, onTabChange }: ResponsiveHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-4 gap-2 sm:gap-4">
        {/* Mobile Navigation */}
        <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cdek-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">С</span>
          </div>
          {!isMobile && (
            <div>
              <h1 className="text-lg xl:text-xl font-bold text-cdek-green">СДЭК Salary Monitor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Система мониторинга зарплат</p>
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          {/* Search */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
            <Input
              placeholder={isMobile ? "Поиск..." : "Поиск по должностям, компаниям..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 border-border/50 focus:border-primary text-xs sm:text-sm h-8 sm:h-10"
            />
          </div>

          {/* Filters - Hidden on mobile */}
          {!isMobile && (
            <>
              <Select>
                <SelectTrigger className="w-[140px] lg:w-[180px] border-border/50 h-10">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Период" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="quarter">Квартал</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[120px] lg:w-[160px] border-border/50 h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Регион" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="moscow">Москва</SelectItem>
                  <SelectItem value="spb">СПб</SelectItem>
                  <SelectItem value="irkutsk">Иркутск</SelectItem>
                  <SelectItem value="all">Все</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <>
              <Badge variant="outline" className="bg-cdek-success/10 text-cdek-success border-cdek-success/20 text-xs px-2 py-1">
                Активен
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1">
                2,847
              </Badge>
            </>
          )}
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-4 w-4" />
            {isMobile && <span className="sr-only">Уведомления</span>}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
