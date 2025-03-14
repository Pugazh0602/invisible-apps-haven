
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PinValidation } from '@/utils/types';
import { X, Delete, Check } from 'lucide-react';

interface PinPadProps {
  onValidPin: () => void;
  onCancel?: () => void;
  expectedPin?: string; // For validation
  setPinMode?: boolean; // If true, allows setting a new PIN
  onPinSet?: (pin: string) => void;
}

const PinPad: React.FC<PinPadProps> = ({ 
  onValidPin, 
  onCancel, 
  expectedPin = '1234', 
  setPinMode = false,
  onPinSet 
}) => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Clear error on pin change
  useEffect(() => {
    if (error) setError('');
  }, [pin]);

  const handleNumberPress = (num: number) => {
    if ((isConfirming ? confirmPin : pin).length < 4) {
      if (isConfirming) {
        setConfirmPin(prev => prev + num);
      } else {
        setPin(prev => prev + num);
      }
    }
  };

  const handleDelete = () => {
    if (isConfirming) {
      setConfirmPin(prev => prev.slice(0, -1));
    } else {
      setPin(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    if (setPinMode) {
      if (!isConfirming) {
        if (pin.length !== 4) {
          setError('PIN must be 4 digits');
          return;
        }
        setIsConfirming(true);
        return;
      } else {
        // Confirm PIN matches
        if (pin !== confirmPin) {
          setError('PINs do not match');
          setConfirmPin('');
          return;
        }
        setSuccess('PIN set successfully');
        if (onPinSet) onPinSet(pin);
        setTimeout(() => {
          onValidPin();
        }, 1000);
      }
    } else {
      // Validate against expected PIN
      if (pin === expectedPin) {
        setSuccess('PIN correct');
        setTimeout(() => {
          onValidPin();
        }, 500);
      } else {
        setError('Incorrect PIN');
        setPin('');
      }
    }
  };

  const renderPinIndicator = () => {
    const currentPin = isConfirming ? confirmPin : pin;
    return (
      <div className="flex gap-3 justify-center mb-6">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index < currentPin.length 
                ? 'bg-vault-primary' 
                : 'bg-vault-muted/40'
            } transition-all duration-200`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto p-6 rounded-2xl glassmorphism animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-vault-text">
          {setPinMode 
            ? (isConfirming ? 'Confirm PIN' : 'Create PIN') 
            : 'Enter PIN'}
        </h2>
        {isConfirming && (
          <p className="text-xs text-vault-text/70 mt-1">
            Enter the same PIN again to confirm
          </p>
        )}
      </div>

      {renderPinIndicator()}

      {error && (
        <div className="bg-red-500/20 text-red-300 py-2 px-3 rounded-md text-sm mb-4 flex items-center justify-center">
          <X className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 text-green-300 py-2 px-3 rounded-md text-sm mb-4 flex items-center justify-center">
          <Check className="w-4 h-4 mr-2" />
          {success}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => handleNumberPress(num)}
            className="h-14 text-lg font-medium bg-vault-muted/20 hover:bg-vault-muted/30 text-vault-text border-vault-muted/30"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-14 bg-vault-muted/20 hover:bg-vault-muted/30 text-vault-text border-vault-muted/30"
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleNumberPress(0)}
          className="h-14 text-lg font-medium bg-vault-muted/20 hover:bg-vault-muted/30 text-vault-text border-vault-muted/30"
        >
          0
        </Button>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="h-14 bg-vault-muted/20 hover:bg-vault-muted/30 text-vault-text border-vault-muted/30"
        >
          <Delete className="h-5 w-5" />
        </Button>
      </div>

      <Button
        className="w-full mt-5 bg-vault-primary hover:bg-vault-primary/90 text-white py-5"
        onClick={handleSubmit}
        disabled={
          (setPinMode && !isConfirming && pin.length !== 4) ||
          (setPinMode && isConfirming && confirmPin.length !== 4) ||
          (!setPinMode && pin.length !== 4)
        }
      >
        {setPinMode
          ? (isConfirming ? 'Confirm PIN' : 'Continue')
          : 'Unlock'}
      </Button>
    </div>
  );
};

export default PinPad;
