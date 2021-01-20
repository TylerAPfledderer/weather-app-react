import { createContext, useEffect, useState } from "react";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { fetchData } from "../../utils";

export const WeatherAppContext = createContext();

export const Provider = ({ children }) => {

	const { location, locationError } = useCurrentLocation();
	// const [oneCall, setOneCall] = useState({});
	const [currentAddress, setAddress] = useState({
		city: ""
	});

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
	// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBLAU2TZ3us-WycexcaFGAI7FZj6ZzsaDQ

	useEffect(() => {
		const { longitude, latitude } = location;

		fetchData(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`, setAddress);

		const weatherCityLoc = "Raleigh";
		const weatherAPIKey = "79709e9bb8ffe2a8b3e3ef6b8f3be053";
		const fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${weatherCityLoc},us&units=imperial&appid=${weatherAPIKey}`;
		const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${weatherCityLoc}&units=imperial&appid=${weatherAPIKey}`;
		

		const oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={minutely}&appid=${weatherAPIKey}`;
		console.log(oneCall);
        fetchData(currentDayUrl, setCurrDay);
		fetchData(fiveDayUrl, setFiveDay);
		
		//35.78590906705397, -78.66007819485183
        
	}, [location]);

	return (
		<WeatherAppContext.Provider
			value={{
				currentForecast: currDayData,
				city: currentAddress.city,
				locationErr: locationError,
				fullFourDays: fiveDayData,
			}}
		>
			{children}
		</WeatherAppContext.Provider>
	);
};
