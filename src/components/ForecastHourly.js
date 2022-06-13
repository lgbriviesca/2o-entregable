import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function ForecastHourly() {

    const [isCelsius, setIsCelsius] = useState(true);
    const [forecast, setForecast] = useState([]);

    const success = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

    axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=50c15f632f3251f35dafd68cbf6524f8&units=metric`
    )
    .then((res) => {
      setForecast(res.data);
    });
};

    console.log(forecast);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
      }, []);

    const conversion = () => {
    if (isCelsius) {
      setIsCelsius();
    } else {
      setIsCelsius(true);
    }
  };

  const clima = forecast.weather?.[0].main;

  const weatherDescription = (clima) => {
    if (clima === "Clouds") {
      return (clima = "Nublado");
    } else if (clima === "Clear") {
      return (clima = "Despejado");
    } else if (clima === "Rain") {
      return (clima = "Lluvia");
    } else if (clima === "Drizzle") {
      return (clima = "Lloviznas");
    } else if (clima === "Thunderstorm") {
      return (clima = "Tormentas");
    } else if (clima === "Atmosphere") {
      return (clima = "Bruma");
    } else {
      return clima;
    }
  };

  const nextHours = forecast.hourly?.slice(1, 14);

  console.log(nextHours);

  return(
    <div className="forecast">

    {nextHours?.map((hour) => (
      <div className="map">

        <section className="forecastSection1">
          <p>
            {new Date(hour.dt * 1000).toLocaleString("en-US", {
              hour: "numeric",
            })}
          </p>
          <p>
            {isCelsius
              ? Math.trunc(hour.temp)
              : Math.trunc((hour.temp * 9) / 5 + 32)}
            {isCelsius ? "C" : "F"}°
          </p>
          <p>{weatherDescription(hour?.weather[0]?.main)}</p>
        </section>
      
          <img
            className="forecastIcon"
            src={`http://openweathermap.org/img/wn/${hour.weather?.[0].icon}@2x.png`}
          />

      </div>
    ))}
    </div>
  );

}

export default ForecastHourly;
