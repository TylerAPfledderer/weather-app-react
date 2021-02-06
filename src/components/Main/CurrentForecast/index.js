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
  currentOutlookBtn,
} from './CurrentForecast.module.scss';

const useCurrentDates = (prop) => {
  const { dt } = prop || {};
  const date = dt && new Date(dt * 1000);

  const weekday =
    date &&
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);

  const fullDay =
    date &&
    new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return { date, weekday, fullDay };
};

const CurrentForecast = () => {
  const { currentForecast } = useContext(WeatherAppContext);
  console.log(
    '🚀 ~ file: index.js ~ line 39 ~ CurrentForecast ~ currentForecast',
    currentForecast
  );

  const { temp, weather } = currentForecast || {};
  const { date, weekday, fullDay } = useCurrentDates(currentForecast);

  return (
    <div className={container}>
      <div className={wrapper}>
        <h2 className={sectionTitle}>Right Now</h2>
        <span className={currentTemp}>
          {Math.floor(temp)} <i className='wi wi-fahrenheit'></i>
        </span>
        <i
          className={`wi wi-owm-${weather && weather[0].id} ${weatherIcon}`}
        ></i>
        <span className={weekDay}>{weekday}</span>
        <span className={fullDate}>{fullDay}</span>
      </div>
      <Link
        to={{ pathname: `/forecast-in-depth/0`, thisDate: date }}
        className={currentOutlookBtn}
      >
        Today's Outlook
      </Link>
    </div>
  );
};

export default CurrentForecast;
