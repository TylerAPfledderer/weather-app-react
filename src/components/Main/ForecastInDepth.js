import { Link } from 'react-router-dom';

/**
 * Button to take the user back to the Current Day info at the root path
 */
const CurrentDayLink = () => (
  <button>
    <Link to='/'>Current Forecast</Link>
  </button>
);

const ForecastInDepth = ({ location }) => {
  const dayNum = location && new Date(location.thisDate).getDay();
  return (
    <div>
      {location.thisDate && dayNum}
      {/* TODO:
        - Create Large title with Day and Date
        - Filter array of hourly data to the hours of the given day
        - Map new array
      */}
      <CurrentDayLink />
    </div>
  );
};

export default ForecastInDepth;
