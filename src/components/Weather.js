import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Clock from "../components/Clock";
import DateInSpanish from "../components/Date";
import ForecastHourly from "../components/ForecastHourly";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState();
  const [tempMin, setTempMin] = useState();
  const [tempMax, setTempMax] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  const [forecast, setForecast] = useState([]);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=50c15f632f3251f35dafd68cbf6524f8&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
        setTemp(res.data.main.temp);
        setTempMin(res.data.main.temp_min);
        setTempMax(res.data.main.temp_max);
        backgroundChange(res.data.weather?.[0].main);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=50c15f632f3251f35dafd68cbf6524f8&units=metric`
      )
      .then((res) => {
        setForecast(res?.data);
      });
  };

  console.log(forecast);
  console.log(weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const conversion = () => {
    if (isCelsius) {
      setTemp((temp * 9) / 5 + 32);
      setTempMin((tempMin * 9) / 5 + 32);
      setTempMax((tempMax * 9) / 5 + 32);
      setIsCelsius();
    } else {
      setTemp(((temp - 32) * 5) / 9);
      setTempMin(((tempMin - 32) * 5) / 9);
      setTempMax(((tempMax - 32) * 5) / 9);
      setIsCelsius(true);
    }
  };

  //------------------------------------------------------//

  const backgroundChange = (weatherInfo) => {
    if (weatherInfo === "Clouds") {
      document.body.style.backgroundImage =
        "url(https://upload.wikimedia.org/wikipedia/commons/a/ad/Clouds_in_Russia._img_105.jpg)";
    } else if (weatherInfo === "Rain") {
      document.body.style.backgroundImage =
        "url(https://www.elindependiente.com/wp-content/uploads/2019/12/LlUVIA.jpg)";
    } else if (weatherInfo === "Clear") {
      document.body.style.backgroundImage =
        "url(https://www.bbva.com/wp-content/uploads/2016/08/Ciudad-de-México-1.jpg)";
    } else if (weatherInfo === "Drizzle") {
      document.body.style.backgroundImage =
        "url(https://www.elindependiente.com/wp-content/uploads/2019/12/LlUVIA.jpg)";
    } else if (weatherInfo === "Thunderstorm") {
      document.body.style.backgroundImage =
        "url(https://admin.municipiospuebla.mx/sites/default/files/admin-fotos-2015-05-16-342125.jpg?up=1523645703)";
    } else {
      document.body.style.backgroundImage =
        "url(https://upload.wikimedia.org/wikipedia/commons/0/0e/Haputale%2C_Sri_Lanka%2C_Tea_plantations_in_fog_3.jpg)";
    }
  };

  const clima = weather.weather?.[0].main;

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

  const nextDays = forecast.daily?.slice(1, 7);

  console.log(nextDays);

  return (
    <div className="generalContainer">
      <div className="forecastHours">
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
      <div className={backgroundChange} className="weatherCard">
        <div id="temp">
          <p>
            <b>{Math.trunc(temp)}°</b>
          </p>
          <div>
            <button onClick={conversion}>{isCelsius ? "to F" : "to C"}°</button>
          </div>
        </div>
        <div className="clock">
          <b>
            {" "}
            <Clock></Clock>{" "}
          </b>
        </div>
        <div>{DateInSpanish()}</div>
        <h3>
          {weather.name} {weather.sys?.country}
        </h3>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
        />
        <h2>{weatherDescription(clima)}</h2>
        <div className="temps">
          <div>
            Temp mín:{" "}
            <b>
              {Math.trunc(tempMin)} {isCelsius ? "C" : "F"}°
            </b>
          </div>
          <div>
            Temp máx:{" "}
            <b>
              {Math.trunc(tempMax)} {isCelsius ? "C" : "F"}°
            </b>
          </div>
        </div>
      </div>
      <div className="forecastDays">
        {nextDays?.map((day) => (
          <div className="map2">
            <div className="forecastDaylySection1">
              <p>
                {new Date(day.dt * 1000).toLocaleString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="forecastDaylySection2">
              <div>
                <p>
                  {isCelsius
                    ? Math.trunc(day.temp.day)
                    : Math.trunc((day.temp.day * 9) / 5 + 32)}
                  {isCelsius ? "C" : "F"}°
                </p>
                <p>{weatherDescription(day?.weather[0]?.main)}</p>
              </div>
              <div>
                <img
                  className="forecastIcon"
                  src={`http://openweathermap.org/img/wn/${day.weather?.[0].icon}@2x.png`}
                />
              </div>
            </div>
            <div className="forecastDaylySection3">
              <div>
                <div className="tempMinMax">
                  <div>
                    {" "}
                    <p>Temp. mín:</p>{" "}
                    <p>
                      {" "}
                      {isCelsius
                        ? Math.trunc(day.temp.min)
                        : Math.trunc((day.temp.min * 9) / 5 + 32)}{" "}
                      {isCelsius ? "C" : "F"}°
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p>Temp. máx:</p>{" "}
                    <p>
                      {" "}
                      {isCelsius
                        ? Math.trunc(day.temp.max)
                        : Math.trunc((day.temp.max * 9) / 5 + 32)}{" "}
                      {isCelsius ? "C" : "F"}°
                    </p>
                  </div>
                </div>
                <p className="info">
                  Temp. por la mañana:{" "}
                  {isCelsius
                    ? Math.trunc(day.temp.morn)
                    : Math.trunc((day.temp.morn * 9) / 5 + 32)}{" "}
                  {isCelsius ? "C" : "F"}°
                </p>
                <p className="info">
                  Temp. por la tarde:{" "}
                  {isCelsius
                    ? Math.trunc(day.temp.eve)
                    : Math.trunc((day.temp.eve * 9) / 5 + 32)}{" "}
                  {isCelsius ? "C" : "F"}°
                </p>
                <p className="info">
                  Temp. por la noche:{" "}
                  {isCelsius
                    ? Math.trunc(day.temp.night)
                    : Math.trunc((day.temp.night * 9) / 5 + 32)}{" "}
                  {isCelsius ? "C" : "F"}°
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
