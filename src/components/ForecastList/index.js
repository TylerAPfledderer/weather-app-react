import { useContext } from "react";
import { WeatherAppContext } from "../Context";
import CurrentDay from "./CurrentDay";

import "./ForecastList.css";

const ForecastList = () => {
	const { forecast } = useContext(WeatherAppContext);

	const minMaxTempsFromData = function () {

		/**
		 * Function to return an object of the data for a single day and it's min/max temps
		 * @param {String} objDate - The original date string from the passed in object
		 * @param {Number} minTemp - Minimum Temperature rounded down to the whole number
		 * @param {Number} maxTemp - Maximum Temperature rounded down to the whole number
         * @param {Object} weather - The nested object containing the icon a description values
		 */
		const newObject = (objDate, minTemp, maxTemp, weather) => {
			const date = new Date(objDate);
			return {
				day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
				monthDay: new Intl.DateTimeFormat("en-US", {
					month: "long",
					day: "numeric",
				}).format(date),
				minTemp: Math.floor(minTemp),
				maxTemp: Math.floor(maxTemp),
				weatherIcon: weather.icon,
				weatherDesc:
					weather.description.charAt(0).toUpperCase() +
					weather.description.slice(1),
			};
		};

		let prevObj;
		let newObjArr = [];
		let tempArr = [];

		// Looping through the array of forecast data
		forecast.forEach((object, index) => {
			if (prevObj === undefined) {
				tempArr.push(object.main.temp);
				prevObj = object;
				return; //Because we only want to log initial values for the following checks
            }
            
			const prevDate = new Date(prevObj.dt_txt).getDay();
			const currDate = new Date(object.dt_txt).getDay();

			if (currDate === prevDate) {
				tempArr.push(object.main.temp);
			} else {
				newObjArr.push(
					newObject(
						prevObj.dt_txt,
						Math.min(...tempArr),
						Math.max(...tempArr),
						prevObj.weather[0]
					)
				);
				tempArr = [object.main.temp];
				prevObj = object;
			}

			if (index === forecast.length - 1) {
				newObjArr.push(
					newObject(
						prevObj.dt_txt,
						Math.min(...tempArr),
						Math.max(...tempArr),
						prevObj.weather[0]
					)
				);
			}
		});
		newObjArr.shift();
		return newObjArr;
	};

	const followingFourDays = minMaxTempsFromData();

	return (
		<section id="forecastList">
			<CurrentDay />
			{/* <ForecastList /> */}
			{followingFourDays.map(
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
