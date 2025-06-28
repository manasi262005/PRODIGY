const SEARCH_HISTORY_KEY = 'weather_search_history';
const MAX_HISTORY_ITEMS = 5;

export interface SearchHistoryItem {
  city: string;
  country: string;
  timestamp: number;
}

export const getSearchHistory = (): SearchHistoryItem[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
};

export const addToSearchHistory = (city: string, country: string): void => {
  try {
    const history = getSearchHistory();
    
    // Remove existing entry if it exists
    const filteredHistory = history.filter(
      item => item.city.toLowerCase() !== city.toLowerCase()
    );
    
    // Add new entry at the beginning
    const newHistory = [
      { city, country, timestamp: Date.now() },
      ...filteredHistory
    ].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const clearSearchHistory = (): void => {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};