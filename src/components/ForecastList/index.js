import { useContext } from "react";
import { WeatherAppContext } from "../Context";
import CurrentDay from "./CurrentDay";
import FollowingDay from "./FollowingDay";

/**
 * Function to reduce the five-day API data to single day instance.
 * Also eliminates the object where the day is equal to the current day.
 * @param {Object} fiveDayData - data passed from the provider grabbed in an API call to the useState.
 */
function minifyFourDay(fiveDayData) {
	/**
	 * Function to return an object of the data for a single day and it's min/max temps
	 * @param {String} objDate - The original date string from the passed in object
	 * @param {Number} minTemp - Minimum Temperature rounded down to the whole number
	 * @param {Number} maxTemp - Maximum Temperature rounded down to the whole number
	 * @param {Object} weather - The nested object containing the icon a description values
	 */
	function newObject(objDate, minTemp, maxTemp, weather) {
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
	}

	let prevObj;
	let newObjArr = [];
	let tempArr = [];
	const todayDay = parseInt(
		new Intl.DateTimeFormat("en-US", {
			day: "numeric",
		}).format(new Date())
	);

	// Looping through the array of forecast data
	fiveDayData.list.forEach((object) => {
		if (prevObj === undefined) {
			tempArr.push(object.main.temp);
			prevObj = object;
			return; //Because we only want to log initial value for the following checks
		}

		const prevDate = new Date(prevObj.dt_txt).getDay();
		const prevDay = parseInt(
			new Intl.DateTimeFormat("en-US", {
				day: "numeric",
			}).format(new Date(prevObj.dt_txt))
		);

		const currDate = new Date(object.dt_txt).getDay();

		const currDay = parseInt(
			new Intl.DateTimeFormat("en-US", {
				day: "numeric",
			}).format(new Date(object.dt_txt))
		);

		// Ensure the array returned is only the next 4 days from the current day.
		if (prevDay === todayDay || currDay > todayDay + 5) {
			prevObj = object;
			return;
		}
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
	});
	return newObjArr;
}

const ForecastList = () => {
	const { fullFourDays } = useContext(WeatherAppContext);

	return (
		<section className="m-4 text-light">
			<CurrentDay />
			<div className="d-flex justify-content-center align-items-center flex-wrap">
				{minifyFourDay(fullFourDays).map(
					({ day, monthDay, minTemp, maxTemp, weatherIcon }, index) => {
						return (
							<FollowingDay
								key={index}
								dayNum={day}
								monthDay={monthDay}
								minTemp={minTemp}
								maxTemp={maxTemp}
								src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
							/>
						);
					}
				)}
			</div>
		</section>
	);
};

export default ForecastList;
