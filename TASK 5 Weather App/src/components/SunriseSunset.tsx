import React from 'react';
import { WeatherData } from '../types/weather';
import { Sunrise, Sunset, Sun, Moon } from 'lucide-react';

interface SunriseSunsetProps {
  weather: WeatherData;
}

const SunriseSunset: React.FC<SunriseSunsetProps> = ({ weather }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCurrentSunPosition = () => {
    const now = Date.now() / 1000;
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;
    
    if (now < sunrise) return 0;
    if (now > sunset) return 100;
    
    const dayLength = sunset - sunrise;
    const elapsed = now - sunrise;
    return (elapsed / dayLength) * 100;
  };

  const sunPosition = getCurrentSunPosition();
  const isDaytime = sunPosition > 0 && sunPosition < 100;
  const now = Date.now() / 1000;
  const isNight = now < weather.sys.sunrise || now > weather.sys.sunset;

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        {isNight ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        Sun & Moon
      </h3>
      
      {/* Animated Sun/Moon Arc Visualization */}
      <div className="relative mb-8">
        <div className="w-full h-32 relative overflow-hidden">
          {/* Background gradient for sky */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
            isNight 
              ? 'bg-gradient-to-b from-indigo-900/30 to-purple-900/30' 
              : 'bg-gradient-to-b from-blue-400/20 to-orange-300/20'
          }`}></div>
          
          {/* Stars for night time */}
          {isNight && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${10 + (i % 3) * 15}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          )}
          
          {/* Arc path */}
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,165,0,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,0,0.6)" />
                <stop offset="100%" stopColor="rgba(255,69,0,0.3)" />
              </linearGradient>
            </defs>
            
            {/* Arc background */}
            <path
              d="M 20 90 Q 100 30 180 90"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Active arc showing sun's path */}
            <path
              d="M 20 90 Q 100 30 180 90"
              stroke={isDaytime ? "url(#arcGradient)" : "rgba(147,197,253,0.4)"}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${sunPosition * 2} 200`}
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Animated Sun */}
          {isDaytime && (
            <div 
              className="absolute transition-all duration-1000 ease-in-out"
              style={{
                left: `${20 + (sunPosition * 0.6)}%`,
                top: `${90 - Math.sin((sunPosition / 100) * Math.PI) * 45}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                {/* Sun rays */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-4 bg-yellow-300/60 rounded-full"
                      style={{
                        left: '50%',
                        top: '-8px',
                        transformOrigin: '50% 16px',
                        transform: `translateX(-50%) rotate(${i * 45}deg)`
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Sun body */}
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg animate-pulse">
                  <div className="absolute inset-0 bg-yellow-200/50 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Animated Moon */}
          {isNight && (
            <div className="absolute top-4 right-8">
              <div className="relative">
                {/* Moon glow */}
                <div className="absolute inset-0 w-8 h-8 bg-blue-200/20 rounded-full blur-md animate-pulse"></div>
                
                {/* Moon body */}
                <div className="relative w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full shadow-lg">
                  {/* Moon craters */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400/50 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-gray-400/50 rounded-full"></div>
                  
                  {/* Moon phase shadow */}
                  <div className="absolute inset-0 bg-gradient-to-l from-gray-500/30 to-transparent rounded-full"></div>
                </div>
                
                {/* Twinkling effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2">
                  <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Clouds animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 left-4 w-8 h-4 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-8 right-12 w-6 h-3 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>

      {/* Sunrise and Sunset Times */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-2xl p-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10"></div>
          <div className="relative z-10">
            <Sunrise className="w-8 h-8 text-orange-300 mx-auto mb-2 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="text-white/70 text-sm mb-1">Sunrise</div>
            <div className="text-white font-bold text-lg">
              {formatTime(weather.sys.sunrise)}
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-500/10"></div>
          <div className="relative z-10">
            <Sunset className="w-8 h-8 text-orange-400 mx-auto mb-2 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <div className="text-white/70 text-sm mb-1">Sunset</div>
            <div className="text-white font-bold text-lg">
              {formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>
      </div>

      {/* Day length and additional info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-white/70 text-sm">Day Length</div>
          <div className="text-white font-semibold">
            {Math.round((weather.sys.sunset - weather.sys.sunrise) / 3600)}h {Math.round(((weather.sys.sunset - weather.sys.sunrise) % 3600) / 60)}m
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-white/70 text-sm">Current Phase</div>
          <div className="text-white font-semibold">
            {isNight ? 'Night' : isDaytime ? 'Day' : 'Twilight'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;