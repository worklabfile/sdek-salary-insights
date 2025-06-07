
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, FileText, PlusCircle, BarChart3, Settings } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'templates', label: 'Шаблоны', icon: FileText },
    { id: 'data-entry', label: 'Добавить', icon: PlusCircle },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'sources', label: 'Источники', icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-card border-border">
          <SheetHeader>
            <SheetTitle className="text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cdek-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">С</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-cdek-green">СДЭК</h1>
                  <p className="text-xs text-muted-foreground">Salary Monitor</p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-8 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="space-y-3">
              <Badge variant="outline" className="w-full bg-cdek-success/10 text-cdek-success border-cdek-success/20 justify-center py-2">
                Парсинг активен
              </Badge>
              <Badge variant="outline" className="w-full bg-primary/10 text-primary border-primary/20 justify-center py-2">
                2,847 записей
              </Badge>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
