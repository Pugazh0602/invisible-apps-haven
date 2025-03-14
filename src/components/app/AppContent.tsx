
import React from 'react';
import { App } from '@/utils/types';
import AppHeader from './AppHeader';
import AppTabs from './AppTabs';

interface AppContentProps {
  apps: App[];
  filteredApps: App[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  currentTab: string;
  setCurrentTab: (value: string) => void;
  onToggleHidden: (id: string, isHidden: boolean) => void;
}

const AppContent: React.FC<AppContentProps> = ({
  apps,
  filteredApps,
  searchTerm,
  setSearchTerm,
  currentTab,
  setCurrentTab,
  onToggleHidden
}) => {
  const hiddenAppsCount = apps.filter(app => app.isHidden).length;

  return (
    <div className="p-6 animate-fade-in">
      <AppHeader
        currentTab={currentTab}
        hiddenAppsCount={hiddenAppsCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <AppTabs
        apps={apps}
        filteredApps={filteredApps}
        searchTerm={searchTerm}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onToggleHidden={onToggleHidden}
        onClearSearch={() => setSearchTerm('')}
      />
    </div>
  );
};

export default AppContent;
