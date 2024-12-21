import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const WeatherService = {
  getWeatherData: async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m`
      );
      const hourlyData = response.data.hourly;
      return hourlyData.time.map((time, index) => ({
        datetime: time,
        temperature: hourlyData.temperature_2m[index],
        humidity: hourlyData.relative_humidity_2m[index],
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

export default WeatherService;
