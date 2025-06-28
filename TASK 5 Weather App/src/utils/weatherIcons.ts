import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  CloudDrizzle,
  Eye,
  EyeOff
} from 'lucide-react';

export const getWeatherIcon = (weatherCode: number, iconCode: string) => {
  const isNight = iconCode.includes('n');
  
  switch (weatherCode) {
    case 800: // Clear sky
      return Sun;
    case 801:
    case 802: // Few clouds / scattered clouds
      return Cloud;
    case 803:
    case 804: // Broken clouds / overcast clouds
      return Cloud;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504: // Rain
      return CloudRain;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321: // Drizzle
      return CloudDrizzle;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622: // Snow
      return CloudSnow;
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232: // Thunderstorm
      return Zap;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781: // Atmosphere
      return isNight ? EyeOff : Eye;
    default:
      return Sun;
  }
};

export const getWeatherBackground = (weatherCode: number) => {
  switch (weatherCode) {
    case 800: // Clear sky
      return 'from-blue-400 via-blue-500 to-blue-600';
    case 801:
    case 802:
    case 803:
    case 804: // Clouds
      return 'from-gray-400 via-gray-500 to-gray-600';
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321: // Rain
      return 'from-blue-600 via-blue-700 to-gray-800';
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622: // Snow
      return 'from-blue-200 via-blue-300 to-blue-400';
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232: // Thunderstorm
      return 'from-gray-800 via-gray-900 to-black';
    default:
      return 'from-blue-400 via-blue-500 to-blue-600';
  }
};