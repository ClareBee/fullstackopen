import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search'
import ResultList from './components/ResultList'
import CountryResult from './components/CountryResult'

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
    const results = countries.filter(country => {
      if(country.name.toUpperCase().match(searchInput.toUpperCase())){
        return country
      }
    })
    if(results.length === 1){
      setCountry(results[0])
    }
    setFilteredCountries(results)
  }

  return (
    <div>
      <Search handleInput={handleInput} searchInput={searchInput} />

      {filteredCountries.length > 1 && <ResultList countries={filteredCountries}/> }

      {filteredCountries.length === 1 && <CountryResult country={country} />}
    </div>
  );
}

export default App;
