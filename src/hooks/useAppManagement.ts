
import { useState, useEffect } from 'react';
import { mockApps } from '@/utils/mockData';
import { App, PinOptions } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

export const useAppManagement = () => {
  const [apps, setApps] = useState<App[]>(mockApps);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('hidden');
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState<boolean>(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  
  // PIN management
  const [hasSetPin, setHasSetPin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('1234');
  const [pinOptions, setPinOptions] = useState<PinOptions>({
    clockUnlock: true // Enable clock unlock by default
  });
  
  const { toast } = useToast();

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

  return {
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
  };
};
