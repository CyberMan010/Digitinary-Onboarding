import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { SearchBarProps } from '@/types';









export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn(
      "relative flex items-center max-w-xl rounded-full border border-input bg-background shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md",
      className
    )}>
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-0 bg-transparent pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
        />
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSearch}
        className="rounded-full px-4 hover:bg-accent mr-1"
      >
        Search
      </Button>
    </div>
  );
}