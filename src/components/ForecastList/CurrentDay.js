import { useContext } from "react";
import { WeatherAppContext } from "../Context";

import Card from "./Card";

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
		<Card classList={"mx-auto mb-3"}>
			{!currentDate ? (
				"Loading..."
			) : (
				<>
					<h3 className="h1 font-weight-bold">{currentDay}</h3>
					<span className="h3">{currentMonthDay}</span>
					<div className="d-flex flex-column">
						<span className="h3">{Math.floor(temp)} &#176;F</span>
						<img
							src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
							alt={description}
						/>
					</div>
				</>
			)}			
		</Card>
	);
};

export default CurrentDay;
