import { useContext } from 'react';
import { dateFormat, isToday, isTomorrow } from '../../utils';
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

  let weekday;

  if (isToday(date)) {
    weekday = 'Today';
  } else if (isTomorrow(date)) {
    weekday = 'Tomorrow';
  } else {
    weekday = dateFormat(date, { weekday: 'long' });
  }

  const monthDay = dateFormat(date, { month: 'numeric', day: 'numeric' });

  return { date, weekday, monthDay };
};

const NavList = () => {
  const { dailyForecast } = useContext(WeatherAppContext);

  return (
    <ul>
      {(dailyForecast &&
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
                day={weekday}
                icon={id}
                minTemp={min}
                maxTemp={max}
                monthDay={monthDay}
              />
            );
          })) || <h2>Loading...</h2>}
    </ul>
  );
};

export default NavList;
