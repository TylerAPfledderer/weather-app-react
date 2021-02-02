import { BsChevronCompactRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ForecastDayLink = ({ icon, day, date, minTemp, maxTemp, index }) => {
  return (
    <li className='nav__item'>
      <Link
        to={{
          pathname: `/forecast-in-depth/${index}`,
          thisDate: date,
        }}
        className='nav__link'
      >
        <i className={`wi wi-owm-${icon} wi-link-icon`}></i>
        <p className='day-link-temps'>
          <span className='day-hi-temp'>
            {Math.floor(maxTemp)}
            <i className='wi wi-fahrenheit'></i>
          </span>
          <span className='day-low-temp'>
            {Math.floor(minTemp)}
            <i className='wi wi-fahrenheit'></i>
          </span>
        </p>
        <div className='day-link-date'>
          <span>{day}</span>
          <span>{date}</span>
        </div>
        <BsChevronCompactRight className='link-indicator' />
      </Link>
    </li>
  );
};

export default ForecastDayLink;
