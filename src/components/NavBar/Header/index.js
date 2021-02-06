import { useContext } from 'react';
import { WeatherAppContext } from '../../Context';

import { header, site_title, city_name } from './Header.module.scss';

const Header = () => {
  const { currentAddress, locationErr } = useContext(WeatherAppContext);
  const { locality, principalSubdivision } = currentAddress;

  return (
    <header className={header}>
      <h1 className={site_title}>5-Day Weather Forecast</h1>
      <h2 className={city_name}>
        {!locality
          ? 'City Not Available'
          : `${locality}, ${principalSubdivision}`}
        {locationErr && <p>Location Error: {locationErr}</p>}
      </h2>
    </header>
  );
};

export default Header;
