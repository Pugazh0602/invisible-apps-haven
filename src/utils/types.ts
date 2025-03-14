
export interface App {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  isHidden: boolean;
  lastUsed?: string; // ISO date string
  category?: string;
}

export interface PinValidation {
  isValid: boolean;
  message?: string;
}

export interface PinOptions {
  clockUnlock?: boolean; // If true, allows unlocking with current date as PIN
}
