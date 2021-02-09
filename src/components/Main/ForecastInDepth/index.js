import { useContext } from 'react';
import { dateFormat } from '../../../utils';
import { WeatherAppContext } from '../../Context';
import InDepthLink from '../../InDepthLink';

import {
  container,
  wrapper,
  weekdayTitle,
  dateSubtitle,
  hourlyList,
  hourlyItem,
  itemTime,
  weatherIcon,
} from './ForecastInDepth.module.scss';

const useHourData = (thisDate) => {
  const { hourForecast } = useContext(WeatherAppContext);
  const dayOfMonth = thisDate && thisDate.getDate();
  const currentHours =
    thisDate &&
    hourForecast.filter(
      (item) => new Date(item.dt * 1000).getDate() === dayOfMonth
    );
  return currentHours && currentHours.slice(0, 8);
};

const ForecastInDepth = ({ location }) => {
  const todayDate =
    location.thisDate &&
    dateFormat(location.thisDate, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const eightHours = useHourData(location.thisDate);

  return (
    <div className={container}>
      <div className={wrapper}>
        <h1 className={weekdayTitle}>{location.weekDay}</h1>
        <h2 className={dateSubtitle}>{todayDate}</h2>
        <ul className={hourlyList}>
          {eightHours &&
            eightHours.map(({ dt, pop, weather, temp }, index) => (
              <li className={hourlyItem} key={index}>
                <span className={itemTime}>{dt}</span>
                <i className={`wi wi-owm-${weather[0].id} ${weatherIcon}`}></i>
                <span>
                  {Math.floor(temp)} <i className='wi wi-degrees'></i>
                </span>
                <span>{`Precip: ${pop * 100}%`}</span>
              </li>
            ))}
        </ul>
      </div>

      <InDepthLink path='/'>Current Forecast</InDepthLink>
    </div>
  );
};

export default ForecastInDepth;
