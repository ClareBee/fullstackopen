import React from 'react'

const CountryResult = ({country}) => (
  <div>
    <h3>{country.name}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <p>Languages:
      <ul>
      {country.languages && country.languages.map(lang => <li>{lang.name}</li>)}
      </ul>
    </p>
    <img src={country.flag} alt="flag" />
  </div>
)

export default CountryResult
