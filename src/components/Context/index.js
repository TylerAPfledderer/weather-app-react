import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const WeatherAppContext = createContext({
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

export const Provider = ({children}) => {

    const [data, setData] = useState({});
    

    const getWeather = async () => {
        try {
            await axios.get("http://api.openweathermap.org/data/2.5/forecast?q=Raleigh,us&units=imperial&appid=79709e9bb8ffe2a8b3e3ef6b8f3be053")
                       .then(data => setData(data.data));      
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