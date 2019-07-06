import React from 'react'
import ResultItem from './ResultItem'

const ResultList = ({countries}) =>
  (countries.map(country =>
    <ResultItem key={country.alpha2Code}>
      {country.name}
    </ResultItem>))


export default ResultList
