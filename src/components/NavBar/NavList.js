import { useContext } from "react";
import { WeatherAppContext } from "../Context";
import ForecastDayLink from "./ForecastDayLink";

const NavList = () => {
  const { dailyforecast } = useContext(WeatherAppContext);

  return (
    <ul>
      {dailyforecast &&
        dailyforecast
          .slice(0, 5)
          .map(({ dt, temp: { min, max }, weather: [{ id }] }, index) => {
            const date = dt !== 0 && new Date(dt * 1000);
            const day = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(date);
            return (
              <ForecastDayLink
                key={index}
                day={day}
                icon={id}
                minTemp={min}
                maxTemp={max}
              />
            );
          })}
    </ul>
  );
};

export default NavList;
