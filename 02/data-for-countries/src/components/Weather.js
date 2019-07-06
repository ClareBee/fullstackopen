import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    const key = process.env.REACT_APP_WEATHER_API_KEY.toString()
    const weatherUrl = `http://api.apixu.com/v1/current.json?key=${key}&q=${capital}`

    axios.get(weatherUrl)
    .then(response => {
      setWeather(response.data.current)
    })
  }, [capital])

  return (
    weather &&
      <div className="weather-block">
        <h2>Weather in {capital}</h2>
        <p>Today: {weather.condition.text}</p>
        <p>Temperature: {weather.temp_c} &#8451;</p>
        <img src={weather.condition.icon} alt="weather"/>
        <p>Wind: {weather.wind_mph} mph. Direction: {weather.wind_dir}</p>
      </div>
  )
}

export default Weather
