import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const WeatherAppContext = createContext();

export const Provider = ({children}) => {

    const [currDayData, setCurrDay] = useState({
        weather: [{
            description: "",
            icon: ""
        }],
        main: {
            temp: 0
        },
        dt: 0
    });
    const [fiveDayData, setFiveDay] = useState({
        city: {name: ""},
        list: [
            {
                main: {
                    temp: 0
                },
                weather: [{
                    description: "",
                    icon: ""
                }],
                dt_txt: ""
            }
        ]
    });

    const weatherCityLoc = "Raleigh";
    const weatherAPIKey = "79709e9bb8ffe2a8b3e3ef6b8f3be053";

    const fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${weatherCityLoc},us&units=imperial&appid=${weatherAPIKey}`;
    
    const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${weatherCityLoc}&units=imperial&appid=${weatherAPIKey}`;

    async function getWeather(url, stateFunc) {
        try {
            await axios.get(url)
                .then(data => stateFunc(data.data));
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getWeather(currentDayUrl, setCurrDay);
        getWeather(fiveDayUrl, setFiveDay);
    }, [currentDayUrl, fiveDayUrl]);

    function minifyFourDay() {

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
		};

		let prevObj;
		let newObjArr = [];
		let tempArr = [];
		const todayDay = new Intl.DateTimeFormat("en-US", {day: "numeric"})
						 	.format(new Date());

		// Looping through the array of forecast data
		fiveDayData.list.forEach(object => {
			if (prevObj === undefined) {
				tempArr.push(object.main.temp);
				prevObj = object;
				return; //Because we only want to log initial values for the following checks
            }
            
			const prevDate = new Date(prevObj.dt_txt).getDay();
			const currDate = new Date(object.dt_txt).getDay();
			const currDay = new Intl.DateTimeFormat("en-US", {day: "numeric"})
			  					.format(new Date(object.dt_txt));

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

			// Ensure the array returned is only the next 4 days from the current day.
			if (currDay > todayDay + 4) {
				return;
			}
		});
		return newObjArr;
    };

    return (
        <WeatherAppContext.Provider
            value={{
                currentForecast: currDayData,
                city: fiveDayData.city,
                minifiedFourDays: minifyFourDay(),
                fullFourDays: fiveDayData
            }}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}