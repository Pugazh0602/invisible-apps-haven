
import React from 'react';
import { Menu, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick?: () => void;
  onInfoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onInfoClick }) => {
  return (
    <header className="py-4 px-6 flex items-center justify-between bg-vault-bg border-b border-vault-muted/30">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-vault-text" />
        </Button>
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-vault-primary mr-2" />
          <h1 className="text-xl font-semibold text-vault-text">AppVault</h1>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={onInfoClick}
      >
        <Info className="h-5 w-5 text-vault-text" />
      </Button>
    </header>
  );
};

export default Header;
