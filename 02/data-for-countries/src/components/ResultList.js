import React from 'react'
import ResultItem from './ResultItem'

const ResultList = ({countries}) => {
  let countriesNum = countries.length

  if (countriesNum > 0 && countriesNum < 10) {
    return (countries.map(country =>
      <ResultItem key={country.alpha2Code}>
        {country.name}
      </ResultItem>
    ))
  } else {
    return <p>Too many matches! Please make your search more specific</p>
  }
}

export default ResultList
