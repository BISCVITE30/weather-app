import React, { useState } from 'react';
import './HeatIndexCalculator.scss';

function HeatIndexCalculator() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [heatIndex, setHeatIndex] = useState(null);

  const calculateHeatIndex = () => {
    if (temperature && humidity) {
      const T = parseFloat(temperature);
      const H = parseFloat(humidity);

      // Проверка на корректность значений
      if (T < 0 || H < 0 || T > 50 || H > 100) {
        alert(
          'Temperature should be between 0 and 50°C and humidity between 0 and 100%'
        );
        return;
      }

      // Формула для расчета индекса тепла
      const c1 = -8.78469475556;
      const c2 = 1.61139411;
      const c3 = 2.33854883889;
      const c4 = -0.14611605;
      const c5 = -0.012308094;
      const c6 = -0.0164248281;
      const c7 = 0.002211732;
      const c8 = 0.00072546;
      const c9 = -0.000003582;

      const index =
        c1 +
        c2 * T +
        c3 * H +
        c4 * T * H +
        c5 * Math.pow(T, 2) +
        c6 * Math.pow(H, 2) +
        c7 * Math.pow(T, 2) * H +
        c8 * T * Math.pow(H, 2) +
        c9 * Math.pow(T, 2) * Math.pow(H, 2);

      // Устанавливаем значение индекса тепла
      setHeatIndex(index.toFixed(2));
    }
  };

  return (
    <div className="heat-index-calculator">
      <h2>Heat Index Calculator</h2>
      <div>
        <label>
          Temperature (°C):
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </label>
        <label>
          Humidity (%):
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </label>
        <button onClick={calculateHeatIndex}>Calculate</button>
      </div>
      {heatIndex && <p>Heat Index: {heatIndex}°C</p>}
    </div>
  );
}

export default HeatIndexCalculator;
