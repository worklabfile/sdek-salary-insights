import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavigation from './MobileNavigation';

interface ResponsiveHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResponsiveHeader = ({ activeTab, onTabChange }: ResponsiveHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="header-fixed w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-4 gap-2 sm:gap-4">
        {/* Mobile Navigation */}
        <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {!isMobile && (
            <div className="hidden lg:block">
              <h1 className="text-lg xl:text-xl font-bold text-cdek-green whitespace-nowrap">СДЭК Salary Monitor</h1>
              <p className="text-xs text-muted-foreground hidden xl:block">Система мониторинга зарплат</p>
            </div>
          )}
        </div>

        {/* Filters - Hidden on mobile */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[140px] lg:w-[180px] border-border/50 h-10">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Период" />
                </SelectTrigger>
                <SelectContent className="dropdown-content z-[100]">
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
                <SelectContent className="dropdown-content z-[100]">
                  <SelectItem value="moscow">Москва</SelectItem>
                  <SelectItem value="spb">СПб</SelectItem>
                  <SelectItem value="irkutsk">Иркутск</SelectItem>
                  <SelectItem value="all">Все</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {!isMobile && (
            <>
              <Badge variant="outline" className="bg-cdek-success/10 text-cdek-success border-cdek-success/20 text-xs px-2 py-1 whitespace-nowrap">
                Активен
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1 whitespace-nowrap">
                2,847
              </Badge>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
