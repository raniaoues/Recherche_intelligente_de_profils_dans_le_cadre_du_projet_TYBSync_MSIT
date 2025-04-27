
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect for focusing input when rendered
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Effect for real-time search as user types
  useEffect(() => {
    // Trigger search on each keystroke
    onSearch(query);
  }, [query, onSearch]);

  return (
    <form 
      className="max-w-2xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <div 
        className={`relative flex items-center rounded-lg overflow-hidden transition-all duration-500
                   ${isFocused 
                     ? 'shadow-[0_0_15px_rgba(66,153,225,0.5)] ring-2 ring-blue-400/50' 
                     : 'shadow-lg'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-md"></div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Rechercher par compétence, localisation, poste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow border-0 bg-transparent text-white focus-visible:ring-0 text-base py-6 px-4 z-10
                     placeholder:text-blue-200/70"
        />
        <Button 
          type="submit" 
          className={`absolute right-0 h-full px-5 bg-blue-600/80 hover:bg-blue-500/80 transition-colors z-10
                      ${isFocused ? 'bg-blue-500/80' : ''}`}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        {/* Decorative elements */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500
                        ${isFocused ? 'w-full' : 'w-0'}`}></div>
        
        {/* Pulsing glow effect when focused */}
        {isFocused && (
          <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
        )}
      </div>
    </form>
  );
};
