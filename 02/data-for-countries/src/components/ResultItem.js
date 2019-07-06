import React from 'react'

const ResultItem = ({ country, switchView }) => {
  return (<li>
    {country.name}
    <button value={country.name} onClick={(e) => switchView(e)}>Show</button>
  </li>)
}

export default ResultItem
