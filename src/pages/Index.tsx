
import React from 'react';
import Header from '@/components/layout/Header';
import LockedState from '@/components/app/LockedState';
import AppContent from '@/components/app/AppContent';
import PinDialog from '@/components/dialogs/PinDialog';
import InfoDialog from '@/components/dialogs/InfoDialog';
import { useAppManagement } from '@/hooks/useAppManagement';

const Index = () => {
  const {
    apps,
    filteredApps,
    searchTerm,
    setSearchTerm,
    currentTab,
    setCurrentTab,
    isLocked,
    isPinDialogOpen,
    setIsPinDialogOpen,
    infoDialogOpen,
    setInfoDialogOpen,
    hasSetPin,
    pin,
    pinOptions,
    handleToggleHidden,
    handleUnlock,
    handleSetPin
  } = useAppManagement();

  return (
    <div className="min-h-screen bg-vault-bg text-vault-text flex flex-col">
      <Header onInfoClick={() => setInfoDialogOpen(true)} />
      <main className="flex-1 overflow-y-auto">
        {isLocked ? (
          <LockedState onUnlock={() => setIsPinDialogOpen(true)} />
        ) : (
          <AppContent
            apps={apps}
            filteredApps={filteredApps}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onToggleHidden={handleToggleHidden}
          />
        )}
      </main>

      <PinDialog
        isOpen={isPinDialogOpen}
        onOpenChange={setIsPinDialogOpen}
        onValidPin={handleUnlock}
        expectedPin={pin}
        setPinMode={!hasSetPin}
        onPinSet={handleSetPin}
        pinOptions={pinOptions}
      />

      <InfoDialog
        isOpen={infoDialogOpen}
        onOpenChange={setInfoDialogOpen}
      />
    </div>
  );
};

export default Index;
