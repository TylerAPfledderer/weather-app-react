import { useContext } from "react";
import { WeatherAppContext } from "../Context";
import CurrentDay from "./CurrentDay";
import FollowingDay from "./FollowingDay";

const ForecastList = () => {
	const { minifiedFourDays } = useContext(WeatherAppContext);

	return (
		<section className="m-4 text-light">
			<CurrentDay />
			<div className="d-flex justify-content-center align-items-center flex-wrap">
				{minifiedFourDays.map(
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
