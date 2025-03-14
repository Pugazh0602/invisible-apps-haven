
import { App } from './types';

export const mockApps: App[] = [
  { 
    id: '1',
    name: 'Instagram',
    packageName: 'com.instagram.android',
    icon: '📷',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Social'
  },
  { 
    id: '2',
    name: 'WhatsApp',
    packageName: 'com.whatsapp',
    icon: '💬',
    isHidden: false,
    lastUsed: new Date().toISOString(),
    category: 'Communication'
  },
  { 
    id: '3',
    name: 'Facebook',
    packageName: 'com.facebook.katana',
    icon: '👤',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Social'
  },
  { 
    id: '4',
    name: 'Tinder',
    packageName: 'com.tinder',
    icon: '❤️',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Dating'
  },
  { 
    id: '5',
    name: 'Google Maps',
    packageName: 'com.google.android.apps.maps',
    icon: '🗺️',
    isHidden: false,
    lastUsed: new Date().toISOString(),
    category: 'Navigation'
  },
  { 
    id: '6',
    name: 'Snapchat',
    packageName: 'com.snapchat.android',
    icon: '👻',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Social'
  },
  { 
    id: '7',
    name: 'Gmail',
    packageName: 'com.google.android.gm',
    icon: '✉️',
    isHidden: false,
    lastUsed: new Date().toISOString(),
    category: 'Productivity'
  },
  { 
    id: '8',
    name: 'Secret Notes',
    packageName: 'com.secretnotes.app',
    icon: '📝',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Productivity'
  },
  { 
    id: '9',
    name: 'Calculator',
    packageName: 'com.android.calculator2',
    icon: '🧮',
    isHidden: false,
    lastUsed: new Date().toISOString(),
    category: 'Utility'
  },
  { 
    id: '10',
    name: 'Private Browser',
    packageName: 'com.privatebrowser.secure',
    icon: '🔒',
    isHidden: true,
    lastUsed: new Date().toISOString(),
    category: 'Browser'
  }
];
