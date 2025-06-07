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
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto bg-card border border-border">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Дашборд
              </TabsTrigger>
              <TabsTrigger value="data-entry" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Ввод данных
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Аналитика
              </TabsTrigger>
            </TabsList>
          )}

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
            {/* Quick Stats */}
            <ResponsiveStatsCards />

            {/* Quick Actions */}
            <ResponsiveQuickActions onTabChange={setActiveTab} />

            {/* Salary Comparison */}
            <div className="grid gap-4 sm:gap-6">
              <SalaryComparison />
            </div>
          </TabsContent>

          {/* Data Entry Tab */}
          <TabsContent value="data-entry" className="animate-fade-in">
            <DataEntryForm selectedTemplate={selectedTemplate} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="animate-fade-in">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
