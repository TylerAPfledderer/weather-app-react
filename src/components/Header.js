import { useContext } from "react";
import { WeatherAppContext } from "./Context";

const Header = () => {

    const { city, locationErr } = useContext(WeatherAppContext);
    
    return (
        <header className="text-center text-light">
            <h1 className="display-1">5-Day Weather Forecast</h1>
            <span className="h2">
                {
                    city === '' 
                    ? "Loading..." 
                    : `${city}`
                }
                {locationErr && <p>Location Error: {locationErr}</p>}
            </span>
        </header>
    );
}

export default Header;