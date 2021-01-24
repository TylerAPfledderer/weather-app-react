import { BsChevronCompactRight } from 'react-icons/bs';
import { WiDegrees } from 'react-icons/wi';

const ForecastDayLink = ({icon, day, date, minTemp, maxTemp}) => {

  /* 
    TODO:
      1. Pass in router props to the li tag for the Link component
      2. Replace the anchor tag with the Link component
  */
  return (
    <li className="nav__item">
      <a href="/" className="nav__link">
        <i className={`wi wi-owm-${icon} wi-link-icon`}></i>
        <p className="day-link-temps">
          <span>{maxTemp}<WiDegrees /></span><span>{minTemp}<WiDegrees /></span>
        </p>
        <div className="day-link-date">
          <span>{day}</span>
          <span>{date}</span>
        </div>
        <BsChevronCompactRight className="link-indicator" />
      </a>
    </li>
  );
};

export default ForecastDayLink;