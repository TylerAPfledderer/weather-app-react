import { useContext } from "react";
import { WeatherAppContext } from "./components/Context";
import "./scss/App.scss";

function App() {
  const { forecast, city } = useContext(WeatherAppContext);
  // const { main } = forecast;

  // const currentDate = new Date(forecast[0].dt_text);
  // const currentDay = new Intl.DateTimeFormat("en-US", {
  //   weekday: "long",
  // }).format(currentDate);

  // const currentMonthDay = new Intl.DateTimeFormat("en-US", {
  //   month: "long",
  //   day: "numeric",
  // }).format(currentDate);
  // const currentWeather = `http://openweathermap.org/img/wn/${forecast[0].weather.icon}@2x.png`;
  // const mainTemp = Math.ceil(forecast.main.temp);
  // const weatherDescription =
  //   forecast[0].weather.description.charAt(0).toUpperCase() +
  //   forecast[0].weather.description.slice(1);

  const minMaxTempsFromData = function() {

    /**
     * Function to return an object of the data for a single day and it's min/max temps
     * @param {String} date 
     * @param {Number} minTemp 
     * @param {Number} maxTemp 
     */
    const newObject = (date, minTemp, maxTemp) => {
      return {
        date,
        minTemp: Math.floor(minTemp),
        maxTemp: Math.floor(maxTemp)
      };
    };

    // Check if state contains the data on render before running the loop
    if (forecast) {
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
          newObjArr.push( newObject(prevObj.dt_txt, Math.min(...tempArr), Math.max(...tempArr)) );
          tempArr = [object.main.temp];
          prevObj = object;
        }

        if (index === forecast.length - 1) {
          newObjArr.push( newObject(prevObj.dt_txt, Math.min(...tempArr), Math.max(...tempArr)) );
        }
      });

      return newObjArr;
    }
  };
  console.log("🚀 ~ file: App.js ~ line 81 ~ minMaxTempsFromData ~ minMaxTempsFromData", minMaxTempsFromData());

  return (
    <>
      <header>
        <h1>5-Day Weather Forecast</h1>
        {/* <span>{city.name}</span> */}
      </header>
      <main>
        <section>
          {/* <ForecastList /> */}
          <div>
            {/* <ForecastCard /> */}
            {/* <h3>{currentDay}</h3>
            <span>{currentMonthDay}</span>
            <div>
              <i className="wi wi-day-sunny" />
              <span>
                {mainTemp}
                <img src={currentWeather} alt={weatherDescription} />
              </span>
            </div>
            <span>{weatherDescription}</span> */}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
