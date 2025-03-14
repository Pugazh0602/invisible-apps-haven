
import React from 'react';
import { Lock } from 'lucide-react';

interface LockedStateProps {
  onUnlock: () => void;
}

const LockedState: React.FC<LockedStateProps> = ({ onUnlock }) => {
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
        onClick={onUnlock}
        className="bg-vault-primary hover:bg-vault-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Unlock AppVault
      </button>
    </div>
  );
};

export default LockedState;
