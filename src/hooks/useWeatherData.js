import { useRef } from 'react';
import { dateFormat } from '../utils';

/**
 * Hook to accept data from the Open Weather API and return formatted immutable values.
 * @param {Object} data
 * @returns {Object} The values stored in variables that are called for render to a component
 *
 * Variable options to desconstruct:
 * - date - original Date object
 * - weekdayName - the date formatted to the name of the day (i.e. Monday)
 * - monthDayYear - the full date of a given day (i.e. January 18, 2021)
 * - currentTemp - the current temperature
 * - hiTemp - High temperature for the given day
 * - lowTemp - Low temperature for the given day
 * - weatherId - ID used to render a custom icon
 * - weatherName - Main description for the day's weather (i.e. Clouds, Rain, Sunny)
 */
const useOpenWeatherData = (data) => {
  const date = useRef(0);
  const weekdayName = useRef('');
  const monthDay = useRef('');
  const monthDayYear = useRef('');
  const currentTemp = useRef(0);
  const hiTemp = useRef(0);
  const lowTemp = useRef(0);
  const weatherId = useRef(0);
  const weatherName = useRef('');

  if (data) {
    const { dt, temp, weather } = data;
    date.current = new Date(dt * 1000);

    weekdayName.current = dateFormat(date.current, { weekday: 'long' });

    monthDay.current = dateFormat(date.current, {
      month: 'numeric',
      day: 'numeric',
    });

    monthDayYear.current = dateFormat(date.current, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    currentTemp.current = typeof temp !== 'object' && Math.floor(temp);

    hiTemp.current = typeof temp === 'object' && Math.floor(temp.max);
    lowTemp.current = typeof temp === 'object' && Math.floor(temp.mix);

    weatherId.current = weather[0].id;

    weatherName.current = weather[0].main;
  }

  return {
    date: date.current,
    weekdayName: weekdayName.current,
    monthDay: monthDay.current,
    monthDayYear: monthDayYear.current,
    currentTemp: currentTemp.current,
    hiTemp: hiTemp.current,
    lowTemp: lowTemp.current,
    weatherId: weatherId.current,
    weatherName: weatherName.current,
  };
};

export default useOpenWeatherData;
