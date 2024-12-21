import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherTable.scss';

function WeatherTable() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,relative_humidity_2m'
      )
      .then((response) => {
        const hourlyData = response.data.hourly;
        const formattedData = hourlyData.time.map((time, index) => ({
          datetime: time,
          temperature: hourlyData.temperature_2m[index],
          humidity: hourlyData.relative_humidity_2m[index], // Исправление здесь
        }));
        setWeatherData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="weather-table">
      <h2>Weather Table</h2>
      <table>
        <thead>
          <tr>
            <th>Datetime</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data, index) => (
            <tr key={index}>
              <td>{data.datetime}</td>
              <td>{data.temperature}</td>
              <td>{data.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherTable;
