
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import ResponsiveHeader from '@/components/ResponsiveHeader';
import ResponsiveStatsCards from '@/components/ResponsiveStatsCards';
import ResponsiveQuickActions from '@/components/ResponsiveQuickActions';
import TemplateSelector from '@/components/TemplateSelector';
import DataEntryForm from '@/components/DataEntryForm';
import Analytics from '@/components/Analytics';
import SalaryComparison from '@/components/SalaryComparison';
import SourcesManager from '@/components/SourcesManager';
import RecentActivity from '@/components/RecentActivity';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cdek-green-light/20">
      <ResponsiveHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={`container mx-auto space-y-4 sm:space-y-6 lg:space-y-8 ${
        isMobile ? 'px-3 py-4' : 'px-4 py-6 lg:py-8'
      }`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 lg:w-[600px] mx-auto bg-card border border-border">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Дашборд
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Шаблоны
              </TabsTrigger>
              <TabsTrigger value="data-entry" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Ввод данных
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="sources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Источники
              </TabsTrigger>
            </TabsList>
          )}

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
            {/* Quick Stats */}
            <ResponsiveStatsCards />

            {/* Quick Actions */}
            <ResponsiveQuickActions onTabChange={setActiveTab} />

            {/* Recent Activity & Salary Comparison */}
            <div className={`grid gap-4 sm:gap-6 ${
              isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              <RecentActivity />
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
