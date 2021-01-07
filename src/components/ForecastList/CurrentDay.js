import { useContext } from "react";
import { WeatherAppContext } from "../Context";

const CurrentDay = () => {
    const {forecastToday} = useContext(WeatherAppContext);
    const {dt_txt, main: {temp}, weather} = forecastToday;

    const currentDate = dt_txt !== '' && new Date(dt_txt);
    const currentDay = new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(currentDate);
    const currentMonthDay = new Intl.DateTimeFormat("en-US", {month: "long", day: "numeric"})
.format(currentDate);
    return (
        <div>
            <h3>{currentDay}</h3>
            <span>{currentMonthDay}</span>
            <div>
                <span>{Math.floor(temp)} &#176;F</span>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description} />
            </div>
        </div>
    );
}

export default CurrentDay;