import { useContext } from "react";
import { WeatherAppContext } from "../Context";
import CurrentDay from "./CurrentDay";

import "./ForecastList.css";

const ForecastList = () => {
	const { minifiedFourDays } = useContext(WeatherAppContext);

	return (
		<section id="forecastList">
			<CurrentDay />
			{/* <ForecastList /> */}
			{minifiedFourDays.map(
				({ day, monthDay, minTemp, maxTemp, weatherIcon }, index) => {
					return (
						<div key={index}>
							<h3>{day}</h3>
							<span>{monthDay}</span>
							<div>
								<span>
									{minTemp} &#176;F / {maxTemp} &#176;F
								</span>
								<img
									src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
									alt=""
								/>
							</div>
						</div>
					);
				}
			)}
		</section>
	);
};

export default ForecastList;
