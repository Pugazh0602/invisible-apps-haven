
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { App } from '@/utils/types';
import AppList from './AppList';

interface AppTabsProps {
  apps: App[];
  filteredApps: App[];
  searchTerm: string;
  currentTab: string;
  onTabChange: (value: string) => void;
  onToggleHidden: (id: string, isHidden: boolean) => void;
  onClearSearch: () => void;
}

const AppTabs: React.FC<AppTabsProps> = ({
  apps,
  filteredApps,
  searchTerm,
  currentTab,
  onTabChange,
  onToggleHidden,
  onClearSearch
}) => {
  return (
    <Tabs 
      value={currentTab} 
      onValueChange={onTabChange}
      className="mt-6"
    >
      <TabsList className="grid grid-cols-3 mb-6 bg-vault-muted/20">
        <TabsTrigger 
          value="hidden"
          className={cn(
            "data-[state=active]:bg-vault-primary data-[state=active]:text-white",
            "flex items-center gap-2"
          )}
        >
          <EyeOff className="h-3.5 w-3.5" />
          Hidden
        </TabsTrigger>
        <TabsTrigger 
          value="visible"
          className={cn(
            "data-[state=active]:bg-vault-primary data-[state=active]:text-white",
            "flex items-center gap-2"
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          Visible
        </TabsTrigger>
        <TabsTrigger 
          value="all"
          className="data-[state=active]:bg-vault-primary data-[state=active]:text-white"
        >
          All Apps
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="hidden" className="mt-0">
        <AppList 
          apps={filteredApps}
          searchTerm={searchTerm}
          currentTab={currentTab}
          onToggleHidden={onToggleHidden}
          onClearSearch={onClearSearch}
          onViewAll={() => onTabChange('all')}
        />
      </TabsContent>
      
      <TabsContent value="visible" className="mt-0">
        <AppList 
          apps={filteredApps}
          searchTerm={searchTerm}
          currentTab={currentTab}
          onToggleHidden={onToggleHidden}
          onClearSearch={onClearSearch}
          onViewAll={() => onTabChange('all')}
        />
      </TabsContent>
      
      <TabsContent value="all" className="mt-0">
        <AppList 
          apps={filteredApps}
          searchTerm={searchTerm}
          currentTab={currentTab}
          onToggleHidden={onToggleHidden}
          onClearSearch={onClearSearch}
          onViewAll={() => onTabChange('all')}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AppTabs;
