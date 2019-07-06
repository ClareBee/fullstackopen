import React from 'react'

const CountryResult = ({ country }) => {
  console.log(country)
return (
  <div className="country-block">
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population.toLocaleString()}</p>
    <p>Languages:</p>
      <ul className="language-list">
      {country.languages && country.languages.map(lang =>
        <li key={lang.iso639_1}>- {lang.name}</li>)
      }
      </ul>
    <img src={country.flag} alt="flag" width="200"/>
  </div>
)
}

export default CountryResult
