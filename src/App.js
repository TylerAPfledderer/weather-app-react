import { useContext } from "react";
import { WeatherAppContext } from "./components/Context";
import ForecastList from "./components/ForecastList";
import "./scss/App.scss";

function App() {
  const { city } = useContext(WeatherAppContext);
  

  return (
    <>
      <header>
        <h1>5-Day Weather Forecast</h1>
        <span></span>
        <span>{city.name}, {city.country}</span>
      </header>
      <main>
        <ForecastList />
      </main>
    </>
  );
}

export default App;
