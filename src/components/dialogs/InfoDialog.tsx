
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, EyeOff, Clock, Info } from 'lucide-react';

interface InfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default InfoDialog;
