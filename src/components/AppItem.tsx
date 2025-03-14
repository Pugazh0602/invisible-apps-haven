
import React from 'react';
import { App } from '@/utils/types';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff } from 'lucide-react';

interface AppItemProps {
  app: App;
  onToggleHidden: (id: string, isHidden: boolean) => void;
}

const AppItem: React.FC<AppItemProps> = ({ app, onToggleHidden }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg card-hover border border-vault-muted/20">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-vault-muted/30 text-xl">
          {app.icon}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-vault-text">{app.name}</span>
          <span className="text-xs text-vault-muted">{app.category}</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-xs text-vault-muted">
          {app.isHidden ? (
            <div className="flex items-center text-vault-secondary">
              <EyeOff className="w-3 h-3 mr-1" />
              Hidden
            </div>
          ) : (
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              Visible
            </div>
          )}
        </span>
        <Switch
          checked={app.isHidden}
          onCheckedChange={(checked) => onToggleHidden(app.id, checked)}
          className="data-[state=checked]:bg-vault-primary"
        />
      </div>
    </div>
  );
};

export default AppItem;
