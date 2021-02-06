import { useContext } from 'react';
import { WeatherAppContext } from '../Context';
import ForecastDayLink from './ForecastDayLink';

/**
 * Function to return an object of date formats
 * @param {Object} date - the Date object passed in
 * @return {Object} The date formats to desconstruct on invoke
 */
const getDateInfo = (date) => {
  if (!(date instanceof Date)) {
    const err = new Error(
      'The provided argument for the getDateInfo function is not a valid Date object.'
    );

    return console.error(err.message);
  }

  let weekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(date);

  if (date.getDate() === new Date().getDate()) {
    weekday = 'Today';
  } else if (date.getDate() === new Date().getDate() + 1) {
    weekday = 'Tomorrow';
  }
  const monthDay = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
  }).format(date);

  return { date, weekday, monthDay };
};

const NavList = () => {
  const { dailyForecast } = useContext(WeatherAppContext);

  return (
    <ul>
      {dailyForecast &&
        dailyForecast
          .slice(0, 5)
          .map(({ dt, temp: { min, max }, weather: [{ id }] }, index) => {
            const { date, weekday, monthDay } = getDateInfo(
              dt !== 0 && new Date(dt * 1000)
            );
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
