import React from 'react';
import { WeatherData } from '../types/weather';
import { Wind, Leaf, AlertTriangle } from 'lucide-react';

interface AirQualityProps {
  weather: WeatherData;
}

const AirQuality: React.FC<AirQualityProps> = ({ weather }) => {
  // Simulate air quality based on weather conditions
  const getAirQuality = () => {
    const weatherId = weather.weather[0].id;
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;
    
    // Better air quality with higher wind speed and certain weather conditions
    let aqi = 50; // Base AQI
    
    if (weatherId >= 200 && weatherId < 300) aqi += 30; // Thunderstorm
    if (weatherId >= 700 && weatherId < 800) aqi += 40; // Atmosphere (fog, haze)
    if (humidity > 80) aqi += 10;
    if (windSpeed > 5) aqi -= 15;
    if (weatherId === 800) aqi -= 10; // Clear sky
    
    return Math.max(10, Math.min(150, aqi));
  };

  const getAQIInfo = (aqi: number) => {
    if (aqi <= 50) return { 
      level: 'Good', 
      color: 'text-green-400', 
      bgColor: 'from-green-500/20 to-emerald-500/20',
      icon: Leaf,
      description: 'Air quality is satisfactory'
    };
    if (aqi <= 100) return { 
      level: 'Moderate', 
      color: 'text-yellow-400', 
      bgColor: 'from-yellow-500/20 to-amber-500/20',
      icon: Wind,
      description: 'Acceptable for most people'
    };
    return { 
      level: 'Unhealthy', 
      color: 'text-red-400', 
      bgColor: 'from-red-500/20 to-orange-500/20',
      icon: AlertTriangle,
      description: 'May cause health concerns'
    };
  };

  const aqi = getAirQuality();
  const aqiInfo = getAQIInfo(aqi);
  const IconComponent = aqiInfo.icon;

  // Simulate pollutant data
  const pollutants = [
    { name: 'PM2.5', value: Math.round(aqi * 0.4), unit: 'μg/m³' },
    { name: 'PM10', value: Math.round(aqi * 0.8), unit: 'μg/m³' },
    { name: 'O₃', value: Math.round(aqi * 0.6), unit: 'μg/m³' },
    { name: 'NO₂', value: Math.round(aqi * 0.3), unit: 'μg/m³' }
  ];

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Leaf className="w-6 h-6" />
        Air Quality
      </h3>
      
      {/* AQI Score */}
      <div className={`bg-gradient-to-br ${aqiInfo.bgColor} rounded-2xl p-6 mb-6 border border-white/10`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{aqi}</div>
            <div className={`text-lg font-semibold ${aqiInfo.color}`}>
              {aqiInfo.level}
            </div>
          </div>
          <IconComponent className={`w-12 h-12 ${aqiInfo.color}`} />
        </div>
        <div className="text-white/80 text-sm">
          {aqiInfo.description}
        </div>
        
        {/* AQI Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                aqi <= 50 ? 'bg-green-400' : 
                aqi <= 100 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(100, (aqi / 150) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Pollutant Details */}
      <div className="space-y-3">
        <h4 className="text-white/80 font-medium text-sm">Main Pollutants</h4>
        {pollutants.map((pollutant, index) => (
          <div key={index} className="flex justify-between items-center py-2 px-3 bg-white/10 rounded-lg">
            <span className="text-white/80 text-sm">{pollutant.name}</span>
            <span className="text-white font-medium text-sm">
              {pollutant.value} {pollutant.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQuality;