import { useEffect, useState } from 'react';

// This Custom Hook provided by Norbert Bartos:
// https://norbertbartos.tech/blog/use-geolocation-api-with-react-hooks/
const useCurrentLocation = () => {
  // store error message in state
  const [locationError, setError] = useState();

  // store location in state
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  // Success handler for geolocation's 'getCurrentPosition' method
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's 'getCurrentPosition' method
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    // If the geolocation is not defined in the used browser you can handle it as an error
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    // Call the Geolocation API
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, locationError };
};

export default useCurrentLocation;
