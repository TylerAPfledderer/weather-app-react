import { useContext } from "react";
import { WeatherAppContext } from "./Context";

const IsCity = ({city, state}) => {
  // API returns "Null Island" for locality if not a name
  if (city === "Null Island" || city === '') {
    return "City Not Available";
  }
  return `${city}, ${state}`;
};

const Header = () => {
  const { currentAddress, locationErr } = useContext(WeatherAppContext);
  const { locality, principalSubdivision } = currentAddress;
  return (
    <header className="text-center text-light">
      <h1 className="display-1">5-Day Weather Forecast</h1>
      <span className="h2">
        {locality === "" ? (
          "Loading..."
        ) : (
          <IsCity city={locality} state={principalSubdivision} />
        )}
        {locationErr && <p>Location Error: {locationErr}</p>}
      </span>
    </header>
  );
};

export default Header;
