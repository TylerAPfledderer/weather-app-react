import { useContext } from 'react';
import useOpenWeatherData from '../../../hooks/useWeatherData';
import { WeatherAppContext } from '../../Context';
import InDepthLink from '../../InDepthLink';

import {
  container,
  wrapper,
  sectionTitle,
  currTemp,
  weatherIcon,
  weekDay,
  fullDate,
} from './CurrentForecast.module.scss';

const CurrentForecast = () => {
  const { currentForecast } = useContext(WeatherAppContext);
  const {
    date,
    weekdayName,
    monthDayYear,
    weatherId,
    currentTemp,
  } = useOpenWeatherData(currentForecast);

  return (
    <div className={container}>
      <div className={wrapper}>
        <h2 className={sectionTitle}>Right Now</h2>
        <span className={currTemp}>
          {currentTemp} <i className='wi wi-fahrenheit'></i>
        </span>
        <i className={`wi wi-owm-${weatherId} ${weatherIcon}`}></i>
        <span className={weekDay}>{weekdayName}</span>
        <span className={fullDate}>{monthDayYear}</span>
      </div>
      <InDepthLink date={date} path='/forecast-in-depth/0' weekday='Today'>
        Today's Outlook
      </InDepthLink>
    </div>
  );
};

export default CurrentForecast;
