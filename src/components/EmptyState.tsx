
import React from 'react';
import { Search, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'empty' | 'no-results' | 'no-hidden';
  searchQuery?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  searchQuery = '', 
  onAction 
}) => {
  const renderContent = () => {
    switch (type) {
      case 'empty':
        return {
          icon: <Shield className="h-12 w-12 text-vault-primary mb-4" />,
          title: 'No Apps Available',
          description: 'We couldn\'t detect any apps on your device. Please try refreshing.',
          actionText: 'Refresh'
        };
      case 'no-results':
        return {
          icon: <Search className="h-12 w-12 text-vault-primary mb-4" />,
          title: 'No Results Found',
          description: `No apps match "${searchQuery}". Try a different search term.`,
          actionText: 'Clear Search'
        };
      case 'no-hidden':
        return {
          icon: <Shield className="h-12 w-12 text-vault-primary mb-4" />,
          title: 'No Hidden Apps',
          description: 'You haven\'t hidden any apps yet. Toggle the switch on any app to hide it.',
          actionText: 'See All Apps'
        };
      default:
        return {
          icon: <Shield className="h-12 w-12 text-vault-primary mb-4" />,
          title: 'Nothing Here',
          description: 'There\'s nothing to show here.',
          actionText: 'Go Back'
        };
    }
  };

  const content = renderContent();

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center h-full min-h-[300px]">
      {content.icon}
      <h3 className="text-xl font-semibold text-vault-text mb-2">{content.title}</h3>
      <p className="text-vault-muted mb-6 max-w-xs mx-auto">{content.description}</p>
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-vault-primary hover:bg-vault-primary/90 text-white"
        >
          {content.actionText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
