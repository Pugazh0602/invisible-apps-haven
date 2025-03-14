
import React from 'react';
import { App } from '@/utils/types';
import AppItem from '@/components/AppItem';
import EmptyState from '@/components/EmptyState';

interface AppListProps {
  apps: App[];
  searchTerm: string;
  currentTab: string;
  onToggleHidden: (id: string, isHidden: boolean) => void;
  onClearSearch: () => void;
  onViewAll: () => void;
}

const AppList: React.FC<AppListProps> = ({
  apps,
  searchTerm,
  currentTab,
  onToggleHidden,
  onClearSearch,
  onViewAll
}) => {
  if (apps.length > 0) {
    return (
      <div className="space-y-3">
        {apps.map(app => (
          <AppItem 
            key={app.id} 
            app={app} 
            onToggleHidden={onToggleHidden} 
          />
        ))}
      </div>
    );
  }
  
  // Empty states
  if (currentTab === 'hidden' && apps.length === 0) {
    const hasHiddenApps = currentTab === 'hidden' && apps.some(app => app.isHidden);
    
    if (hasHiddenApps) {
      return (
        <EmptyState 
          type="no-results" 
          searchQuery={searchTerm}
          onAction={onClearSearch}
        />
      );
    } else {
      return (
        <EmptyState 
          type="no-hidden" 
          onAction={onViewAll}
        />
      );
    }
  }
  
  return (
    <EmptyState 
      type="no-results" 
      searchQuery={searchTerm}
      onAction={onClearSearch}
    />
  );
};

export default AppList;
