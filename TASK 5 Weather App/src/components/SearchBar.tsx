import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sparkles, Clock, X } from 'lucide-react';
import { getSearchHistory, clearSearchHistory, SearchHistoryItem } from '../utils/searchHistory';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onUseLocation, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setIsFocused(false);
      // Refresh history after search
      setTimeout(() => setSearchHistory(getSearchHistory()), 100);
    }
  };

  const handleHistoryClick = (city: string) => {
    onSearch(city);
    setQuery('');
    setIsFocused(false);
    // Refresh history after search
    setTimeout(() => setSearchHistory(getSearchHistory()), 100);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const popularCities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 transition-colors group-hover:text-white/80" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for any city worldwide..."
            className={`w-full pl-12 pr-6 py-4 bg-white/15 backdrop-blur-md border-2 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-lg ${
              isFocused ? 'bg-white/20 border-white/40' : 'border-white/20'
            }`}
            disabled={isLoading}
          />
          {isFocused && (
            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl -z-10 animate-pulse"></div>
          )}
        </div>
        
        {/* Search suggestions dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
            <div className="p-4">
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white/80 text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </div>
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-white/60 hover:text-white/80 transition-colors"
                      title="Clear history"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleHistoryClick(item.city)}
                        className="w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{item.city}, {item.country}</span>
                        <span className="text-white/50 text-xs">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Cities */}
              <div>
                <div className="text-white/80 text-sm font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Popular Cities
                </div>
                <div className="space-y-1">
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        onSearch(city);
                        setQuery('');
                        setIsFocused(false);
                        setTimeout(() => setSearchHistory(getSearchHistory()), 100);
                      }}
                      className="w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
      
      <button
        onClick={onUseLocation}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-3 py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white/90 hover:bg-white/20 hover:border-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="font-medium">Use My Current Location</span>
      </button>
    </div>
  );
};

export default SearchBar;