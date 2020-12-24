import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const WeatherAppContext = createContext();

export const Provider = ({children}) => {

    const [data, setData] = useState([]);

    const getWeather = async () => {
        try {
            const weatherData = await axios.get("http://api.openweathermap.org/data/2.5/forecast?q=Raleigh,us&units=imperial&appid=79709e9bb8ffe2a8b3e3ef6b8f3be053");
            setData(weatherData.data);           
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getWeather();
    }, []);


    return (
        <WeatherAppContext.Provider
            value={{
                city: data.city,
                forecast: data.list
            }}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}

/**
    const filterDuplicateObjVals = (arr, prop) => {
        const newArr = [];
        let prevItem;
        array.forEach(currentItem => {
            if (prevItem === undefined || prevItem[prop] !== currentItem[prop]) {
            newArr.push(currentItem);
            }
            prevItem = currentItem;
        });
        return newArr;
    } 
 */