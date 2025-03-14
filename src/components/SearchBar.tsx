
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search apps..." 
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vault-muted">
        <Search className="h-4 w-4" />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 bg-vault-muted/20 border-vault-muted/30 text-vault-text placeholder:text-vault-muted focus:border-vault-primary/50 focus-visible:ring-vault-primary/20"
      />
    </div>
  );
};

export default SearchBar;
