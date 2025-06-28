import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const IconComponent = getWeatherIcon(weather.weather[0].id, weather.weather[0].icon);
  
  const formatDate = () => {
    return new Date().toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
      {/* Header with location and date */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-white/80" />
          <span className="text-white/90 font-semibold text-lg">
            {weather.name}, {weather.country}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime()}</span>
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <IconComponent className="w-28 h-28 text-white drop-shadow-2xl" />
            <div className="absolute inset-0 w-28 h-28 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-7xl font-light text-white mb-3 drop-shadow-lg">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="text-2xl text-white/90 capitalize font-medium mb-3">
            {weather.weather[0].description}
          </div>
          <div className="text-xl text-white/70">
            Feels like {Math.round(weather.main.feels_like)}°
          </div>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-white/70 text-sm mb-1">High</div>
            <div className="text-white font-bold text-2xl">
              {Math.round(weather.main.temp_max)}°
            </div>
          </div>
          
          <div className="flex-1 mx-6">
            <div className="relative">
              <div className="w-full bg-white/20 rounded-full h-2"></div>
              <div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                style={{ 
                  width: `${((weather.main.temp - weather.main.temp_min) / (weather.main.temp_max - weather.main.temp_min)) * 100}%` 
                }}
              ></div>
              <div 
                className="absolute top-1/2 w-4 h-4 bg-white rounded-full border-2 border-white/50 transform -translate-y-1/2 shadow-lg"
                style={{ 
                  left: `${((weather.main.temp - weather.main.temp_min) / (weather.main.temp_max - weather.main.temp_min)) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-white/70 text-sm mb-1">Low</div>
            <div className="text-white font-bold text-2xl">
              {Math.round(weather.main.temp_min)}°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;