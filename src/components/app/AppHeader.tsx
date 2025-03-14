
import React from 'react';
import SearchBar from '@/components/SearchBar';

interface AppHeaderProps {
  currentTab: string;
  hiddenAppsCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  hiddenAppsCount,
  searchTerm,
  onSearchChange
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'hidden': return 'Hidden Apps';
      case 'visible': return 'Visible Apps';
      default: return 'All Apps';
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-vault-text">
          {getTabTitle()}
        </h2>
        <div className="text-xs text-vault-muted">
          {hiddenAppsCount} apps hidden
        </div>
      </div>
      
      <SearchBar 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="Search by app name..."
      />
    </>
  );
};

export default AppHeader;
