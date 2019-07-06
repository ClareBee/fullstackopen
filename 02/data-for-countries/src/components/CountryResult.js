import React from 'react'

const CountryResult = ({ country }) => {
  console.log(country)
return (  <div>
    <h3>{country.name}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <p>Languages:</p>
      <ul>
      {country.languages && country.languages.map(lang =>
        <li key={lang.iso639_1}>{lang.name}</li>)
      }
      </ul>
    <img src={country.flag} alt="flag" width="200"/>
  </div>
)
}

export default CountryResult
