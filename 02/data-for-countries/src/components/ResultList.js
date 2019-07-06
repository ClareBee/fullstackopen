import React from 'react'
import ResultItem from './ResultItem'

const ResultList = ({ searchInput, countries, switchView }) => {
  let countriesNum = countries.length

  if (countriesNum > 0 && countriesNum < 10) {
    return (countries.map(country => {
      const countryItem = {...country}
      return (<ResultItem
        key={country.alpha2Code}
        country={countryItem}
        switchView={switchView}
      />)}
    ))
  } else if (!searchInput) {
    return <p>Start typing...</p>
  } else {
    return <p>Too many matches! Please make your search more specific</p>
  }
}

export default ResultList
