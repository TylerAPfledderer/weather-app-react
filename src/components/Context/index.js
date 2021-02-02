import { createContext, useEffect, useState } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { fetchData } from '../../utils';

export const WeatherAppContext = createContext();

export const Provider = ({ children }) => {
  const { location, locationError } = useCurrentLocation();

  const [currentAddress, setAddress] = useState({
    city: '',
    principalSubdivision: '',
  });

  const [oneCall, setOneCall] = useState({
    current: {
      dt: 0,
      temp: 0,
      weather: [
        {
          id: 0,
          description: '',
        },
      ],
    },
    daily: [
      {
        dt: 0,
        temp: {
          min: 0,
          max: 0,
        },
        weather: [
          {
            id: 0,
            description: '',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const { longitude, latitude } = location;
    // Get city and state from geo coordinates generated from useCurrentLocation hook

    const weatherAPIKey = '79709e9bb8ffe2a8b3e3ef6b8f3be053';

    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={minutely}&units=imperial&appid=${weatherAPIKey}`;

    fetchData(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      setAddress
    );
    fetchData(oneCallUrl, setOneCall);
  }, [location]);

  return (
    <WeatherAppContext.Provider
      value={{
        currentForecast: oneCall.current,
        currentAddress,
        locationErr: locationError,
        dailyForecast: oneCall.daily,
        hourForecast: oneCall.hourly,
      }}
    >
      {children}
    </WeatherAppContext.Provider>
  );
};
