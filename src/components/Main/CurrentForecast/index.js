import { useContext } from 'react';
import useOpenWeatherData from '../../../hooks/useWeatherData';
import MainLayout from '../../../layout/MainLayout';
import { WeatherAppContext } from '../../Context';

import {
  contentContainer,
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
      <MainLayout
        date={date}
        linkPath={`/forecast-in-depth/?day=${date && date.toLocaleDateString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'})}`}
        dayName='Today'
        linkText="Today's Outlook"
      >
        <div className={contentContainer}>
          <h2 className={sectionTitle}>Right Now</h2>
          <span className={currTemp}>
            {currentTemp} <i className='wi wi-fahrenheit'></i>
          </span>
          <i className={`wi wi-owm-${weatherId} ${weatherIcon}`}></i>
          <span className={weekDay}>{weekdayName}</span>
          <span className={fullDate}>{monthDayYear}</span>
        </div>

      </MainLayout>
  );
};

export default CurrentForecast;
