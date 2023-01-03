import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Weather = () => {

  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState()

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const long = pos.coords.longitude
      setLocation({lat, long})
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e94ecc0812736a0dc38aa193cf4491c3`)
      .then(res => setWeather(res.data))
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])


  // useEffect(() => {
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44&lon=24&appid=e94ecc0812736a0dc38aa193cf4491c3`)
  //     .then(res => setWeather(res.data))
  // }, [])

  const kevinToCel = Math.floor(weather.main?.feels_like - 273);
  const celToFan = kevinToCel * 2 + 30;

  const [isToFaren, setIsToFaren] = useState(true);

  const changeTemp = () => {
    
    setIsToFaren(!isToFaren);
  }


return (
    <div>
    <div className='whole'>
      <div className='leftSide'>
        <h1>Weather App</h1>
        <h3>{weather.name}, {weather.sys?.country}</h3>
        <img src={`  http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`  
} alt="" />
        <h2>{isToFaren ? kevinToCel : celToFan} {isToFaren ? 'C' : 'F'}</h2>
      </div>
      {/* isToFaren ? kevinToCel : celToFan */}
      <div className='rightSide'>
          <ul>
          <h2>{weather.weather?.[0].description}</h2>            
            <li><i className="fa-solid size fa-wind"></i>  Wind Speed: {weather.wind?.speed} m/s</li>
            <li><i className="fa-solid size fa-cloud"></i>  Clouds: {weather.clouds?.all}%</li>
            <li><i className="fa-solid size fa-temperature-three-quarters"></i>  Pressure: {weather.main?.pressure} hPa</li>
          </ul>
      </div>
    </div>

      <button onClick={changeTemp} className='btn'>CHANGE TEMP</button>
      {/* <button onClick={changeTempToFa} className='btn'>Farengheit</button> */}
    </div>
  );
};

export default Weather;