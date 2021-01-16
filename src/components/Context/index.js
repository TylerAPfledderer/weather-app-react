import { createContext, useEffect, useState } from "react";
import { fetchData } from "../../utils";

export const WeatherAppContext = createContext();

export const Provider = ({ children }) => {
	const [currDayData, setCurrDay] = useState({
		weather: [
			{
				description: "",
				icon: "",
			},
		],
		main: {
			temp: 0,
		},
		dt: 0,
	});
	const [fiveDayData, setFiveDay] = useState({
		city: { name: "" },
		list: [
			{
				main: {
					temp: 0,
				},
				weather: [
					{
						description: "",
						icon: "",
					},
				],
				dt_txt: "",
			},
		],
	});

	useEffect(() => {

		const weatherCityLoc = "Raleigh";
		const weatherAPIKey = "79709e9bb8ffe2a8b3e3ef6b8f3be053";
		const fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${weatherCityLoc},us&units=imperial&appid=${weatherAPIKey}`;
        const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${weatherCityLoc}&units=imperial&appid=${weatherAPIKey}`;
                
        fetchData(currentDayUrl, setCurrDay);
        fetchData(fiveDayUrl, setFiveDay);
        
	}, []);

	return (
		<WeatherAppContext.Provider
			value={{
				currentForecast: currDayData,
				city: fiveDayData.city,
				fullFourDays: fiveDayData,
			}}
		>
			{children}
		</WeatherAppContext.Provider>
	);
};
