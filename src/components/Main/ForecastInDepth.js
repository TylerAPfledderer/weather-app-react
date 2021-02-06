import InDepthLink from '../InDepthLink';

const ForecastInDepth = ({ location }) => {
  console.log(
    '🚀 ~ file: ForecastInDepth.js ~ line 4 ~ ForecastInDepth ~ location',
    new Date(location.thisDate)
  );
  const dayNum = location && new Date(location.thisDate).getDay();
  return (
    <div>
      {location.thisDate && dayNum}
      {/* TODO:
        - Create Large title with Day and Date
        - Filter array of hourly data to the hours of the given day
        - Map new array
      */}
      <InDepthLink path='/'>Current Forecast</InDepthLink>
    </div>
  );
};

export default ForecastInDepth;
