import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WeatherAppContext } from '../../Context';

import {
  container,
  wrapper,
  sectionTitle,
  currentTemp,
  weatherIcon,
  weekDay,
  fullDate,
} from './CurrentForecast.module.scss';

const CurrentForecast = () => {
  const { currentForecast } = useContext(WeatherAppContext);

  const { dt } = currentForecast;

  const date = dt !== 0 && new Date(dt * 1000);
  const weekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(date);
  const fullDay = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  return (
    <div className={container}>
      <div className={wrapper}>
        <h2 className={sectionTitle}>Right Now</h2>
        <span className={currentTemp}>
          35 <i className='wi wi-fahrenheit'></i>
        </span>
        <i className={`wi wi-owm-803 ${weatherIcon}`}></i>
        <span className={weekDay}>{weekday}</span>
        <span className={fullDate}>{fullDay}</span>
      </div>
      <button>
        <Link to={{ pathname: `/forecast-in-depth/0`, thisDate: date }}>
          Today's Outlook
        </Link>
      </button>
    </div>
  );
};

export default CurrentForecast;
