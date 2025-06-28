import React from 'react';
import { WeatherData } from '../types/weather';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  CloudRain,
  Compass,
  Activity
} from 'lucide-react';

interface WeatherDetailsProps {
  weather: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getUVIndex = () => {
    // Simulate UV index based on time and weather
    const hour = new Date().getHours();
    if (hour < 6 || hour > 18) return 0;
    if (weather.weather[0].id === 800) return 8; // Clear sky
    if (weather.weather[0].id < 600) return 3; // Cloudy/rainy
    return 5; // Partly cloudy
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-400' };
    return { level: 'Extreme', color: 'text-purple-400' };
  };

  const uvIndex = getUVIndex();
  const uvInfo = getUVLevel(uvIndex);

  const detailCards = [
    {
      icon: Thermometer,
      title: 'Feels Like',
      value: `${Math.round(weather.main.feels_like)}°`,
      subtitle: `${Math.round(weather.main.temp_max)}° / ${Math.round(weather.main.temp_min)}°`,
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Droplets,
      title: 'Humidity',
      value: `${weather.main.humidity}%`,
      subtitle: weather.main.humidity > 70 ? 'High' : weather.main.humidity > 40 ? 'Moderate' : 'Low',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Wind,
      title: 'Wind',
      value: `${weather.wind.speed} m/s`,
      subtitle: `${getWindDirection(weather.wind.deg)} (${weather.wind.deg}°)`,
      color: 'from-green-500/20 to-teal-500/20'
    },
    {
      icon: Gauge,
      title: 'Pressure',
      value: `${weather.main.pressure}`,
      subtitle: 'hPa',
      color: 'from-purple-500/20 to-indigo-500/20'
    },
    {
      icon: Eye,
      title: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)}`,
      subtitle: 'km',
      color: 'from-gray-500/20 to-slate-500/20'
    },
    {
      icon: CloudRain,
      title: 'Cloudiness',
      value: `${weather.clouds.all}%`,
      subtitle: weather.clouds.all > 75 ? 'Overcast' : weather.clouds.all > 25 ? 'Partly Cloudy' : 'Clear',
      color: 'from-sky-500/20 to-blue-500/20'
    },
    {
      icon: Activity,
      title: 'UV Index',
      value: uvIndex.toString(),
      subtitle: uvInfo.level,
      color: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      icon: Compass,
      title: 'Wind Direction',
      value: getWindDirection(weather.wind.deg),
      subtitle: `${weather.wind.deg}°`,
      color: 'from-emerald-500/20 to-green-500/20'
    }
  ];

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Activity className="w-7 h-7" />
        Weather Details
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {detailCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div 
              key={index}
              className={`bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-3">
                <IconComponent className="w-6 h-6 text-white/80" />
                <span className="text-white/70 text-sm font-medium">{card.title}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
              <div className={`text-sm ${card.title === 'UV Index' ? uvInfo.color : 'text-white/60'}`}>
                {card.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;