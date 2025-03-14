
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PinPad from '@/components/PinPad';
import { PinOptions } from '@/utils/types';

interface PinDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onValidPin: () => void;
  expectedPin: string;
  setPinMode: boolean;
  onPinSet: (newPin: string) => void;
  pinOptions: PinOptions;
}

const PinDialog: React.FC<PinDialogProps> = ({
  isOpen,
  onOpenChange,
  onValidPin,
  expectedPin,
  setPinMode,
  onPinSet,
  pinOptions
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-vault-bg border-vault-muted/30 max-w-xs sm:max-w-sm p-0 pt-6">
        <PinPad 
          onValidPin={onValidPin} 
          onCancel={() => onOpenChange(false)}
          expectedPin={expectedPin}
          setPinMode={setPinMode}
          onPinSet={onPinSet}
          pinOptions={pinOptions}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PinDialog;
