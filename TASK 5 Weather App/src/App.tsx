import React, { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from './types/weather';
import { 
  fetchWeatherByCoords, 
  fetchWeatherByCity, 
  fetchForecastByCoords,
  getCurrentPosition 
} from './utils/weatherApi';
import { addToSearchHistory } from './utils/searchHistory';
import { getWeatherBackground } from './utils/weatherIcons';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import WeatherDetails from './components/WeatherDetails';
import SunriseSunset from './components/SunriseSunset';
import AirQuality from './components/AirQuality';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { Cloud } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocationDenied, setIsLocationDenied] = useState(false);

  const backgroundGradient = weather 
    ? getWeatherBackground(weather.weather[0].id)
    : 'from-blue-400 via-blue-500 to-blue-600';

  useEffect(() => {
    handleUseLocation();
  }, []);

  const handleUseLocation = async () => {
    setLoading(true);
    setError(null);
    setIsLocationDenied(false);
    
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCoords(latitude, longitude),
        fetchForecastByCoords(latitude, longitude)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Add to search history
      addToSearchHistory(weatherData.name, weatherData.country);
    } catch (err: any) {
      console.error('Location error:', err);
      
      // Check if the error is due to permission denial
      if (err.code === 1 || err.message?.includes('denied') || err.message?.includes('User denied')) {
        setIsLocationDenied(true);
        setError('Location access was denied. Please search for a city manually to get weather information.');
      } else {
        setError('Unable to get your location. Please search for a city manually.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setIsLocationDenied(false);
    
    try {
      const weatherData = await fetchWeatherByCity(city);
      const forecastData = await fetchForecastByCoords(weatherData.coord?.lat || 0, weatherData.coord?.lon || 0);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Add to search history
      addToSearchHistory(weatherData.name, weatherData.country);
    } catch (err) {
      console.error('Search error:', err);
      setError(`Unable to find weather data for "${city}". Please check the city name and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    handleUseLocation();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Cloud className="w-10 h-10 text-white drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              Weather Pro
            </h1>
          </div>
          <p className="text-white/90 text-xl font-medium">
            Your comprehensive weather companion
          </p>
          <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-4"></div>
        </header>

        <SearchBar 
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
          isLoading={loading}
        />

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="max-w-md mx-auto">
            <ErrorMessage 
              message={error} 
              onRetry={!isLocationDenied ? handleRetry : undefined}
            />
          </div>
        )}
        
        {weather && !loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Main weather card - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            
            {/* Side panel with additional info */}
            <div className="space-y-6">
              <SunriseSunset weather={weather} />
              <AirQuality weather={weather} />
            </div>
            
            {/* Weather details - full width */}
            <div className="lg:col-span-3">
              <WeatherDetails weather={weather} />
            </div>
            
            {/* Forecast - full width */}
            {forecast && (
              <div className="lg:col-span-3">
                <ForecastCard forecast={forecast} />
              </div>
            )}
          </div>
        )}
        
        {!weather && !loading && !error && (
          <div className="text-center text-white/80 p-12 max-w-md mx-auto">
            <div className="relative mb-6">
              <Cloud className="w-20 h-20 mx-auto opacity-50" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Welcome to Weather Pro</h3>
            <p className="text-lg">Search for a city or use your location to get comprehensive weather information</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;