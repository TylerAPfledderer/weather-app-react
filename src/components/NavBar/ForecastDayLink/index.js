import { BsChevronCompactRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import {
  link_item,
  link,
  day_link__temps,
  day_hi__temp,
  day_low__temp,
  wi_link_icon,
  day_link__date,
} from './ForecastDayLink.module.scss';

const ForecastDayLink = ({
  icon,
  day,
  date,
  monthDay,
  minTemp,
  maxTemp,
}) => {
  
  return (
    /**
     * TODO:
     *  Interpolate a variable in pathname to use the query for generating
     *    hourly data instead of a separate prop.
     */
    <li className={link_item}>
      <Link
        to={{
          pathname: `/forecast-in-depth/?day=${date.toLocaleDateString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'})}`,
          weekDay: day,
        }}
        className={link}
      >
        <i className={`wi wi-owm-${icon} ${wi_link_icon}`}></i>
        <p className={day_link__temps}>
          <span className={day_hi__temp}>
            {Math.floor(maxTemp)}
            <i className='wi wi-fahrenheit'></i>
          </span>
          <span className={day_low__temp}>
            {Math.floor(minTemp)}
            <i className='wi wi-fahrenheit'></i>
          </span>
        </p>
        <div className={day_link__date}>
          <span>{day}</span>
          <span>{monthDay}</span>
        </div>
        <BsChevronCompactRight />
      </Link>
    </li>
  );
};

export default ForecastDayLink;
