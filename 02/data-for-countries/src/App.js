import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search'
import ResultList from './components/ResultList'
import CountryResult from './components/CountryResult'

function App() {
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
    console.log(event.target.value)
    filterCountries(countries)
  }

  const filterCountries = (countries) => {
    const results = countries.filter(country => {
      if(country.name.toUpperCase().match(searchInput.toUpperCase())){
        return country
      }
    })
    setFilteredCountries(results)
  }

  return (
    <div>
      <Search handleInput={handleInput} searchInput={searchInput} />
      <ResultList countries={filteredCountries}/>
      <CountryResult />
    </div>
  );
}

export default App;
