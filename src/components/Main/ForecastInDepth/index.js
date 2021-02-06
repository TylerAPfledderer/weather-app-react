import { useContext } from 'react';
import { WeatherAppContext } from '../../Context';
import InDepthLink from '../../InDepthLink';

import { container, wrapper, hourlyList } from './ForecastInDepth.module.scss';

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
  const eightHours = useHourData(location.thisDate);
  return (
    <div className={container}>
      <div className={wrapper}>
        <h1>Today</h1>
        <h2>January 18, 2021</h2>
        <ul className={hourlyList}>
          {eightHours &&
            eightHours.map(({ dt, pop, weather, temp }, index) => (
              <li key={index}>
                <span>{dt}</span>
                <i className={`wi wi-owm-${weather[0].id}`}></i>
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
