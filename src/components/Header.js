import { useContext } from "react";
import { WeatherAppContext } from "./Context";

const Header = () => {

    const { city } = useContext(WeatherAppContext);

    return (
        <header className="text-center text-light">
            <h1 className="display-1">5-Day Weather Forecast</h1>
            <span className="h2">
                {
                    city.name === '' 
                    ? "Loading..." 
                    : `${city.name} ${city.country}`
                }
            </span>
        </header>
    );
}

export default Header;