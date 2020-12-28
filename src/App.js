import { useContext } from "react";
import { WeatherAppContext } from "./components/Context";
import "./scss/App.scss";

function App() {
  const { forecast } = useContext(WeatherAppContext);
  console.log("🚀 ~ file: App.js ~ line 7 ~ App ~ forecast", forecast);

  const cityTemp = { name: "Raleigh" }; // Replace this in the return with city from useContext();
  const forecastTemplate = {
    // Replace this in the return with forecast from useContext();
    main: {
      temp: 36.16,
    },
    weather: [
      {
        description: "clear sky",
        icon: "04n",
      },
    ],
    dt_text: 1608778800,
  };

  const {
    main: { temp },
  } = forecastTemplate;

  const currentDate = new Date(forecastTemplate.dt_text);
  const currentDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(currentDate);

  const currentMonthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(currentDate);
  const currentWeather = `http://openweathermap.org/img/wn/${forecastTemplate.weather[0].icon}@2x.png`;
  const mainTemp = Math.ceil(temp);
  const weatherDescription =
    forecastTemplate.weather[0].description.charAt(0).toUpperCase() +
    forecastTemplate.weather[0].description.slice(1);

  // const filterObjArrByDateProp = (arr, prop) => {
  //   let prevObj;
  //   const uniqueDates = [];

  //   // Ensure an array is returned by Provider fetch call before iterating
  //   if (arr) {
  //     arr.forEach(object => {
  //       if (prevObj === undefined) {
  //         // Set prevObj then move to next object to do clean check
  //         prevObj = object;
  //         uniqueDates.push(object); // This object also needs to be stored as a unique
  //         return;
  //       }

  //       // Define day by number for previous and current object from the "dt" prop
  //       const prevDate = new Date(prevObj[prop]).getDay();
  //       const currDate = new Date(object[prop]).getDay();

  //       if (prevDate === currDate) {
  //         // Immediately return as we need only one object per day value given.
  //         return;
  //       }

  //       // Store object with unique day
  //       uniqueDates.push(object);
  //       prevObj = object;
  //     });
  //   }

  //   return uniqueDates;
  // }

  // console.log(filterObjArrByDateProp(forecast, "dt_txt"));

  const minMaxTempsFromData = function() {
    let prevObj;
    let newObjArr = [];
    let tempArr = [];

    const newObject = (date, minTemp, maxTemp) => {
      return {
        date,
        minTemp: Math.floor(minTemp),
        maxTemp: Math.floor(maxTemp)
      };
    };

    if (forecast) {

      forecast.forEach((object, index) => {
        if (prevObj === undefined) {
          prevObj = object;
          tempArr.push(object.main.temp);
          return; //Because we only want to log initial values for the following checks
        }

        const prevDate = new Date(prevObj.dt_txt).getDay();
        const currDate = new Date(object.dt_txt).getDay();

        if (currDate === prevDate) {
          tempArr.push(object.main.temp);
        } else {
          newObjArr.push(newObject(prevObj.dt_txt, Math.min(...tempArr), Math.max(...tempArr)));
          prevObj = object;
          tempArr = [object.main.temp];
        }

        if (index === forecast.length - 1) {
          newObjArr.push(newObject(prevObj.dt_txt, Math.min(...tempArr), Math.max(...tempArr)));
        }
      });
    }

    return newObjArr;
  };
  console.log(
    "🚀 ~ file: App.js ~ line 111 ~ minMaxTempsFromData ~ minMaxTempsFromData",
    minMaxTempsFromData()
  );

  return (
    <>
      <header>
        <h1>5-Day Weather Forecast</h1>
        <span>{cityTemp.name}</span>
      </header>
      <main>
        <section>
          {/* <ForecastList /> */}
          <div>
            {/* <ForecastCard /> */}
            <h3>{currentDay}</h3>
            <span>{currentMonthDay}</span>
            <div>
              <i className="wi wi-day-sunny" />
              <span>
                {mainTemp}
                <img src={currentWeather} alt={weatherDescription} />
              </span>
            </div>
            <span>{weatherDescription}</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
