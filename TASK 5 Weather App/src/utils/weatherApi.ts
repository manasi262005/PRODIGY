const API_KEY = 'de64091dc65bd8d29ee5d3f1b531e3cd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Weather data not available');
    }
    
    const data = await response.json();
    return {
      ...data,
      country: data.sys.country,
      coord: data.coord
    };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'City not found');
    }
    
    const data = await response.json();
    return {
      ...data,
      country: data.sys.country,
      coord: data.coord
    };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchForecastByCoords = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Forecast data not available');
    }
    
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    });
  });
};