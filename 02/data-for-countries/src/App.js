import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import earth from './earth.png'
import Header from './components/Header'
import Search from './components/Search'
import ResultList from './components/ResultList'
import CountryResult from './components/CountryResult'
import Weather from './components/Weather'

function App() {
  const [ country, setCountry ] = useState({})
  const [ countries, setCountries ] = useState([])
  const [ searchInput, setSearchInput ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(response)
      setCountries(response.data)
    })
  }, [])

  const handleInput = (event) => {
    setSearchInput(event.target.value)
    filterCountries(countries)
  }

  const filterCountries = (countries) => {
    const results = countries.filter(country => country.name.toUpperCase().match(searchInput.toUpperCase()))
    if(results.length === 1){
      setCountry(results[0])
    }
    setFilteredCountries(results)
  }

  const switchView = (event) => {
    event.preventDefault()
    let newCountry = countries.filter(country => country.name.toUpperCase() === event.target.value.toUpperCase())
    setCountry(newCountry[0])
  }

  return (
    <div className="container">
      <Header earth={earth} title="CountriesSearch"/>
      <Search handleInput={handleInput} searchInput={searchInput} />

      {filteredCountries.length > 1 &&
        <ResultList
          searchInput={searchInput}
          countries={filteredCountries}
          switchView={switchView}
        />
      }
      {country.capital &&
        <div className="display">
          <CountryResult country={country} />
          <Weather capital={country.capital} className="weather-block" />
        </div>}
    </div>
  );
}

export default App;
