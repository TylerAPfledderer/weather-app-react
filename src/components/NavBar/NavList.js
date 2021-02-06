import { useContext } from 'react';
import { WeatherAppContext } from '../Context';
import ForecastDayLink from './ForecastDayLink';

const NavList = () => {
  const { dailyForecast } = useContext(WeatherAppContext);

  return (
    <ul>
      {dailyForecast &&
        dailyForecast
          .slice(0, 5)
          .map(({ dt, temp: { min, max }, weather: [{ id }] }, index) => {
            const date = dt !== 0 && new Date(dt * 1000);
            const weekday = new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
            }).format(date);
            const monthDay = new Intl.DateTimeFormat('en-US', {
              month: 'numeric',
              day: 'numeric',
            }).format(date);
            return (
              <ForecastDayLink
                key={index}
                date={date}
                index={index}
                day={weekday}
                icon={id}
                minTemp={min}
                maxTemp={max}
                monthDay={monthDay}
              />
            );
          })}
    </ul>
  );
};

export default NavList;
