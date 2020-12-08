import { useContext } from 'react';
import { WeatherAppContext } from './components/Context';
import './scss/App.scss';

function App() {

  const { city, forecast } = useContext(WeatherAppContext);
 
  const cityTemp = {name: "Raleigh"}
  const forecastTemplate = {
    "main": {
      "temp": 36.16
    },
    "weather": [
      {
        "description": "clear sky",
        "icon": "04n"
      }
    ],
    "dt_text": "2020-12-08 15:00:00"
  }

  const currentDate = new Date(forecastTemplate.dt_text);
  const currentDay = new Intl.DateTimeFormat('en-US', {weekday: "long"}).format(currentDate);

  const currentMonthDay = new Intl.DateTimeFormat('en-US', {month: "long", day: "numeric"}).format(currentDate);
  const currentWeather = `http://openweathermap.org/img/wn/${forecastTemplate.weather[0].icon}@2x.png`
  const mainTemp = Math.ceil(forecastTemplate.main.temp);
  const weatherDescription = 
    forecastTemplate.weather[0].description.charAt(0).toUpperCase() 
    + 
    forecastTemplate.weather[0].description.slice(1);
  return (
    <>
      <header>
        <h1>5-Day Weather Forecast</h1>
        <span>{cityTemp.name}</span>
      </header>
      <main>
        <section>
          <div>
            <h3>{currentDay}</h3>
            <span>{currentMonthDay}</span>
            <div>
              <i className="wi wi-day-sunny" />
              <span>{mainTemp}<img src={currentWeather} alt={weatherDescription}/></span>
            </div>
            <span>{weatherDescription}</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
