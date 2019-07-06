import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    const key = process.env.REACT_APP_WEATHER_API_KEY.toString()
    const weatherUrl = `http://api.apixu.com/v1/current.json?key=${key}&q=${capital}`

    axios.get(weatherUrl)
    .then(response => {
      console.log(response.data.current)
      setWeather(response.data.current)
    })
  }, [])

  return (
    weather &&
      <div>
        <p>Weather in {capital}: {weather.condition.text}</p>
        <p>Temperature: {weather.temp_c} &#8451;</p>
        <img src={weather.condition.icon} />
        <p>Wind: {weather.wind_mph} mph. Direction: {weather.wind_dir}</p>
      </div>
  )
}

export default Weather
