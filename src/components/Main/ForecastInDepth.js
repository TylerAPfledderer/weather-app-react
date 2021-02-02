import { Link } from 'react-router-dom';

/**
 * Button to take the user back to the Current Day info at the root path
 */
const CurrentDayLink = () => {
  return (
    <button>
      <Link to='/'>Current Forecast</Link>
    </button>
  );
};

const ForecastInDepth = ({ location }) => {
  const dayNum = location && new Date(location.thisDate).getDay();
  return (
    <div>
      {location.thisDate && dayNum}
      <CurrentDayLink />
    </div>
  );
};

export default ForecastInDepth;
