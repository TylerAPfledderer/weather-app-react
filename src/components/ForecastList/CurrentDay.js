import { useContext } from "react";
import { WeatherAppContext } from "../Context";

const CurrentDay = () => {
	const { currentForecast } = useContext(WeatherAppContext);

	const {
		weather: [{ description, icon }],
		main: { temp },
		dt,
	} = currentForecast;

	const currentDate = dt !== 0 && new Date(dt * 1000); // dt prop holds a unix timestamp value
	const currentDay = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
    }).format(currentDate);
    
	const currentMonthDay = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
    }).format(currentDate);
    
	return (
		<>
			{!currentDate ? (
				<div>Loading...</div>
			) : (
				<div>
					<h3>{currentDay}</h3>
					<span>{currentMonthDay}</span>
					<div>
						<span>{Math.floor(temp)} &#176;F</span>
						<img
							src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
							alt={description}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default CurrentDay;
