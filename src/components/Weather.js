import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios"
const Weather = () => {

    const [weather, setWeather] = useState([])
    const [temp, setTemp] = useState()
    const [tempMin, setTempMin] = useState()
    const [tempMax, setTempMax] = useState()
    const [isCelsius, setIsCelsius] = useState(true)

  const success = position => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=50c15f632f3251f35dafd68cbf6524f8&units=metric`)
    .then(res => {
        setWeather(res.data)
        setTemp(res.data.main.temp); 
        setTempMin(res.data.main.temp_min); 
        setTempMax(res.data.main.temp_max); 
        backgroundChange (res.data.weather?.[0].main);
    })

  }

  console.log(weather)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []) 
 
    const conversion = () =>{  //11
        if (isCelsius){
          setTemp(temp * 9 / 5 + 32);
          setTempMin(tempMin * 9 / 5 + 32);
          setTempMax(tempMax * 9 / 5 + 32);
          setIsCelsius ()
        }else{
          setTemp((temp - 32) * 5 / 9);
          setTempMin((tempMin - 32) * 5 / 9);
          setTempMax((tempMax - 32) * 5 / 9);
          setIsCelsius  (true)
        }
      } 
    
//------------------------------------------------------//

const backgroundChange = (weatherInfo) => {
    if (weatherInfo === "Clouds") { (document.body.style.backgroundImage = "url(https://wallpapers-hd-wide.com/wp-content/uploads/2015/11/empty_road_house_city_street_1920x1080.jpg)");
    } else if (weatherInfo === "Rain") { (document.body.style.backgroundImage = "url(https://www.elindependiente.com/wp-content/uploads/2019/12/LlUVIA.jpg)");
    } else if (weatherInfo ==="Clear") { (document.body.style.backgroundImage = "url(https://n.com.do/wp-content/uploads/2021/02/D4L2yNGXkAA2ZT1-1140x694.jpg)");
    } else { document.body.style.backgroundImage= "url(background.gif)";
    }
  }


 // document.body.style = `background: ${backgroundChange}`
  
//------------------------------------------------------//

    return (
        <div className={backgroundChange} className="weatherCard">
            <div id="temp">
                <p><b>{Math.trunc(temp)} {isCelsius ? "C" : "F"}°</b></p>
               <div> <button onClick={conversion}>{isCelsius ? "to F" : "to C"}°</button></div>
            </div>
            <h1>The Weather</h1>
            <h3>{weather.name}, {weather.sys?.country}</h3>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}/>
            <h2>{weather.weather?.[0].main}</h2>
            <section>
                <div>Temp min: <b>{Math.trunc(tempMin)}°</b></div>
                <div>Temp max: <b>{Math.trunc(tempMax)}°</b></div>
            </section>
        </div>
    );
};

export default Weather;

