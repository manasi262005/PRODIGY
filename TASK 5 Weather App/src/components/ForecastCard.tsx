import React from 'react';
import { ForecastData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Calendar, TrendingUp } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Group forecast by day and get 6 days
  const getDailyForecast = () => {
    const dailyData: { [key: string]: any[] } = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Get 6 days of forecast
    return Object.keys(dailyData).slice(0, 6).map(date => {
      const dayData = dailyData[date];
      // Find the entry closest to noon (12:00)
      const noonEntry = dayData.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 11 && hour <= 13;
      }) || dayData[Math.floor(dayData.length / 2)]; // Fallback to middle entry

      // Calculate min/max temps for the day
      const temps = dayData.map(item => item.main.temp);
      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);

      return {
        ...noonEntry,
        main: {
          ...noonEntry.main,
          temp_max: tempMax,
          temp_min: tempMin
        }
      };
    });
  };

  const dailyForecast = getDailyForecast();

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], { weekday: 'long' });
    }
  };

  const getShortDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Calendar className="w-7 h-7" />
        6-Day Forecast
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dailyForecast.map((day, index) => {
          const IconComponent = getWeatherIcon(day.weather[0].id, day.weather[0].icon);
          const isToday = index === 0;
          
          return (
            <div 
              key={index} 
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isToday ? 'ring-2 ring-white/30 bg-white/20' : ''
              }`}
            >
              <div className="text-center">
                {/* Day and Date */}
                <div className="mb-4">
                  <div className={`font-semibold ${isToday ? 'text-white' : 'text-white/90'} text-lg`}>
                    {getDayName(day.dt)}
                  </div>
                  <div className="text-white/60 text-sm">
                    {getShortDate(day.dt)}
                  </div>
                </div>
                
                {/* Weather Icon */}
                <div className="flex justify-center mb-4 relative">
                  <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />
                  {isToday && (
                    <div className="absolute inset-0 w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                  )}
                </div>
                
                {/* Temperature */}
                <div className="mb-3">
                  <div className="text-white font-bold text-xl mb-1">
                    {Math.round(day.main.temp)}°
                  </div>
                  <div className="text-white/60 text-sm">
                    {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
                  </div>
                </div>
                
                {/* Weather Description */}
                <div className="text-white/80 text-sm capitalize mb-3 leading-tight">
                  {day.weather[0].description}
                </div>
                
                {/* Additional Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>Humidity</span>
                    <span>{day.main.humidity}%</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Wind</span>
                    <span>{day.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Forecast Trend */}
      <div className="mt-8 bg-white/10 rounded-2xl p-6 border border-white/10">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Temperature Trend (6 Days)
        </h4>
        <div className="relative h-16">
          <svg className="w-full h-full" viewBox="0 0 600 60">
            {/* Temperature line */}
            <polyline
              points={dailyForecast.map((day, index) => 
                `${(index * 100) + 50},${60 - ((day.main.temp + 10) / 50 * 40)}`
              ).join(' ')}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-sm"
            />
            {/* Temperature points */}
            {dailyForecast.map((day, index) => (
              <circle
                key={index}
                cx={(index * 100) + 50}
                cy={60 - ((day.main.temp + 10) / 50 * 40)}
                r="3"
                fill="white"
                className="drop-shadow-sm"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;