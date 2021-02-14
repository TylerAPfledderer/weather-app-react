import { useContext, useRef } from 'react';
import MainLayout from '../../../layout/MainLayout';
import { dateFormat } from '../../../utils';
import { WeatherAppContext } from '../../Context';

import {
  contentContainer,
  weekdayTitle,
  dateSubtitle,
  hourlyList,
  hourlyItem,
  itemTime,
  tempText,
  weatherIcon,
} from './ForecastInDepth.module.scss';

const useHourData = (thisDate) => {
  const { hourForecast } = useContext(WeatherAppContext);
  const dayOfMonth = useRef(0);
  const currentHours = useRef([]);

  if (thisDate) {
    dayOfMonth.current = thisDate.getDate();
    currentHours.current = hourForecast.filter(
      (item) => new Date(item.dt * 1000).getDate() === dayOfMonth.current
    );
    return currentHours.current.slice(0, 8);
  }
};

const ForecastInDepth = ({ location }) => {
  const dayQuery = new URLSearchParams(window.location.search).get('day');

  const todayDate = dateFormat(new Date(dayQuery), {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const eightHours = useHourData(new Date(dayQuery));

  return (
    /**
     * TODO:
     *  - Add conditional to provide "Not Available" text
     *    if no hourly data exists for a given day passed to this component
     *  - Replace Router Link prop that passes in Date object with call to the URL query to generate
     *    the hourly data for the chosen day.
     */
    <MainLayout linkPath='/' linkText='Current Forecast'>
      <div className={contentContainer}>
        <h1 className={weekdayTitle}>{location.weekDay}</h1>
        <h2 className={dateSubtitle}>{todayDate}</h2>
        {eightHours.length === 0 
          ? <h3>This data is currently not available. Check back tomorrow!</h3>
          : null
        }
        <ul className={hourlyList}>
          {eightHours &&
            eightHours.map(({ dt, pop, weather, temp }, index) => {
              const hour = dateFormat(new Date(dt * 1000), {
                timeStyle: 'short',
              });
              return (
                <li className={hourlyItem} key={index}>
                  <span className={itemTime}>{hour}</span>
                  <i
                    className={`wi wi-owm-${weather[0].id} ${weatherIcon}`}
                  ></i>
                  <span className={tempText}>
                    {Math.floor(temp)} <i className='wi wi-degrees'></i>
                  </span>
                  <span>{`Precip: ${Math.floor(pop * 100)}%`}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default ForecastInDepth;
