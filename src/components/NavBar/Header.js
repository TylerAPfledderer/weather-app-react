import { useContext } from 'react';
import { WeatherAppContext } from '../Context';

const Header = () => {
  const { currentAddress, locationErr } = useContext(WeatherAppContext);
  const { city, principalSubdivision } = currentAddress;

  return (
    <header className='nav__header'>
      <h1 className='site-title'>5-Day Weather Forecast</h1>
      <h2 className='city-name'>
        {!city ? 'City Not Available' : `${city}, ${principalSubdivision}`}
        {locationErr && <p>Location Error: {locationErr}</p>}
      </h2>
    </header>
  );
};

export default Header;
