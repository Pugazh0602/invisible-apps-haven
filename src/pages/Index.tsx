
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApps } from '@/utils/mockData';
import { App, PinOptions } from '@/utils/types';
import Header from '@/components/layout/Header';
import AppItem from '@/components/AppItem';
import SearchBar from '@/components/SearchBar';
import PinPad from '@/components/PinPad';
import EmptyState from '@/components/EmptyState';
import { Eye, EyeOff, Lock, Info, Shield, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const Index = () => {
  const [apps, setApps] = useState<App[]>(mockApps);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('hidden');
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState<boolean>(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Set up PIN on first launch (normally would be stored securely)
  const [hasSetPin, setHasSetPin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('1234');
  const [pinOptions, setPinOptions] = useState<PinOptions>({
    clockUnlock: true // Enable clock unlock by default
  });
  
  useEffect(() => {
    // Simulate loading apps
    const timer = setTimeout(() => {
      if (isLocked && !hasSetPin) {
        setIsPinDialogOpen(true);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = currentTab === 'all' || 
                      (currentTab === 'hidden' && app.isHidden) || 
                      (currentTab === 'visible' && !app.isHidden);
    return matchesSearch && matchesTab;
  });

  const handleToggleHidden = (id: string, isHidden: boolean) => {
    setApps(prev => 
      prev.map(app => 
        app.id === id ? { ...app, isHidden } : app
      )
    );
    
    toast({
      title: isHidden ? "App Hidden" : "App Visible",
      description: `${apps.find(app => app.id === id)?.name} is now ${isHidden ? 'hidden' : 'visible'}.`,
      duration: 3000,
    });
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setIsPinDialogOpen(false);
    toast({
      title: "Vault Unlocked",
      description: "You now have access to your hidden apps.",
      duration: 3000,
    });
  };

  const handleSetPin = (newPin: string) => {
    setPin(newPin);
    setHasSetPin(true);
    toast({
      title: "PIN Set Successfully",
      description: "Your security PIN has been set.",
      duration: 3000,
    });
  };

  const handleInfoClick = () => {
    setInfoDialogOpen(true);
  };

  const renderContent = () => {
    if (isLocked) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="text-center mb-8">
            <Lock className="h-16 w-16 text-vault-primary mx-auto mb-4 animate-pulse-subtle" />
            <h2 className="text-2xl font-semibold text-vault-text mb-2">AppVault is Locked</h2>
            <p className="text-vault-muted max-w-xs mx-auto">
              Enter your PIN to access and manage your hidden apps.
            </p>
          </div>
          <button 
            onClick={() => setIsPinDialogOpen(true)}
            className="bg-vault-primary hover:bg-vault-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Unlock AppVault
          </button>
        </div>
      );
    }

    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-vault-text">
            {currentTab === 'hidden' ? 'Hidden Apps' : 
             currentTab === 'visible' ? 'Visible Apps' : 'All Apps'}
          </h2>
          <div className="text-xs text-vault-muted">
            {apps.filter(app => app.isHidden).length} apps hidden
          </div>
        </div>
        
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search by app name..."
        />
        
        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab}
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
            <div className="space-y-3">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => (
                  <AppItem 
                    key={app.id} 
                    app={app} 
                    onToggleHidden={handleToggleHidden} 
                  />
                ))
              ) : (
                currentTab === 'hidden' && apps.some(app => app.isHidden) ? (
                  <EmptyState 
                    type="no-results" 
                    searchQuery={searchTerm}
                    onAction={() => setSearchTerm('')}
                  />
                ) : (
                  <EmptyState 
                    type="no-hidden" 
                    onAction={() => setCurrentTab('all')}
                  />
                )
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="visible" className="mt-0">
            <div className="space-y-3">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => (
                  <AppItem 
                    key={app.id} 
                    app={app} 
                    onToggleHidden={handleToggleHidden} 
                  />
                ))
              ) : (
                <EmptyState 
                  type="no-results" 
                  searchQuery={searchTerm}
                  onAction={() => setSearchTerm('')}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-3">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => (
                  <AppItem 
                    key={app.id} 
                    app={app} 
                    onToggleHidden={handleToggleHidden} 
                  />
                ))
              ) : (
                <EmptyState 
                  type="no-results" 
                  searchQuery={searchTerm}
                  onAction={() => setSearchTerm('')}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-vault-bg text-vault-text flex flex-col">
      <Header onInfoClick={handleInfoClick} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
        <DialogContent className="bg-vault-bg border-vault-muted/30 max-w-xs sm:max-w-sm p-0 pt-6">
          <PinPad 
            onValidPin={handleUnlock} 
            onCancel={() => setIsPinDialogOpen(false)}
            expectedPin={pin}
            setPinMode={!hasSetPin}
            onPinSet={handleSetPin}
            pinOptions={pinOptions}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="bg-vault-bg border-vault-muted/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-vault-primary" />
              About AppVault
            </DialogTitle>
            <DialogDescription>
              Securely hide and manage your private apps
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <p className="text-vault-text text-sm">
              AppVault allows you to hide applications from your home screen and app drawer. 
              Hidden apps are protected by a PIN and can only be accessed through this app.
            </p>
            
            <Separator className="bg-vault-muted/30" />
            
            <div>
              <h4 className="text-vault-text font-medium mb-2">Features:</h4>
              <ul className="text-sm text-vault-muted space-y-2">
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-vault-primary mt-0.5" />
                  <span>PIN protection for your hidden apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <EyeOff className="h-4 w-4 text-vault-primary mt-0.5" />
                  <span>Hide apps from prying eyes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-vault-primary mt-0.5" />
                  <span>Clock unlock using today's date (DDYY format)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-vault-primary mt-0.5" />
                  <span>Note: This is a demo with mock data. In a real app, actual device apps would be shown and hidden.</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
