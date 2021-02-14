import NavBar from './components/NavBar';
import Main from './components/Main';

import './css/weather-icons.min.css';
import './global_styles/base.scss';
import ErrorBoundary from './components/ErrorBoundary';
import { useContext, useEffect } from 'react';
import { WeatherAppContext } from './components/Context';

function App() {
  const { currentForecast } = useContext(WeatherAppContext);

  useEffect(() => {
    if (currentForecast) {
      const {dt} = currentForecast;
      const date = new Date(dt * 1000);
      if (date.getHours() >= 18 || date.getHours() < 6) {
        document.documentElement.style.setProperty('--current-time-color', 'var(--night-body-color)')
      } else {
        document.documentElement.style.setProperty('--current-time-color', 'var(--day-body-color)')
      }
    }
  }, [currentForecast]);
  return (
    <div className='app-container'>
      <div className='app-wrapper'>
        <ErrorBoundary>
          <NavBar />
          <Main />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
