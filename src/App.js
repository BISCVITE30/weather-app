import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherTable from './components/WeatherTable';
import WeatherChart from './components/WeatherChart';
import HeatIndexCalculator from './components/HeatIndexCalculator';
import './App.scss';

function App() {
  return (
    <Router>
      <div className='app'>
        <header>
          <h1>London Weather App</h1>
          <nav>
            <ul>
              <li><Link to="/">Weather Table</Link></li>
              <li><Link to="/chart">Weather Chart</Link></li>
              <li><Link to="/heat-index">Heat Index Calculator</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<WeatherTable />}></Route>
            <Route path='/chart' element={<WeatherChart />}></Route>
            <Route path='/heat-index' element={<HeatIndexCalculator />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;