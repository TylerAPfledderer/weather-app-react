import { useContext } from 'react';
import { WeatherAppContext } from '../../Context';
import InDepthLink from '../../InDepthLink';

import {
  container,
  wrapper,
  sectionTitle,
  currentTemp,
  weatherIcon,
  weekDay,
  fullDate,
} from './CurrentForecast.module.scss';

const useCurrentData = (prop) => {
  const { dt, temp, weather } = prop || {};
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

  const currTemp = temp ? Math.floor(temp) : 0;

  const weatherId = weather && weather[0].id;

  return { date, weekday, fullDay, currTemp, weatherId };
};

const CurrentForecast = () => {
  const { currentForecast } = useContext(WeatherAppContext);
  const { date, weekday, fullDay, currTemp, weatherId } = useCurrentData(
    currentForecast
  );

  return (
    <div className={container}>
      <div className={wrapper}>
        <h2 className={sectionTitle}>Right Now</h2>
        <span className={currentTemp}>
          {currTemp} <i className='wi wi-fahrenheit'></i>
        </span>
        <i className={`wi wi-owm-${weatherId} ${weatherIcon}`}></i>
        <span className={weekDay}>{weekday}</span>
        <span className={fullDate}>{fullDay}</span>
      </div>
      {/* <Link
        to={{ pathname: `/forecast-in-depth/0`, thisDate: date }}
        className={currentOutlookBtn}
      >
        Today's Outlook
      </Link> */}
      <InDepthLink date={date} path='/forecast-in-depth/0' weekday='Today'>
        Today's Outlook
      </InDepthLink>
    </div>
  );
};

export default CurrentForecast;
