import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import './WeatherChart.scss';

function WeatherChart() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,relative_humidity_2m'
      )
      .then((response) => {
        const hourlyData = response.data.hourly;
        const data = {
          labels: hourlyData.time,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: hourlyData.temperature_2m,
              fill: false,
              backgroundColor: 'blue',
              borderColor: 'blue',
            },
            {
              label: 'Humidity (%)',
              data: hourlyData.relative_humidity_2m,
              fill: false,
              backgroundColor: 'green',
              borderColor: 'green',
            },
          ],
        };
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  if (!weatherData) {
    return <p>Loading weather chart...</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="weather-chart">
      <h2>Weather Chart</h2>
      <Line data={weatherData} options={options} />
    </div>
  );
}

export default WeatherChart;
